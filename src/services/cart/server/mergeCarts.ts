import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk';

export async function mergeCarts(
  apiRoot: ByProjectKeyRequestBuilder,
  anonymousId: string
): Promise<void> {
  const me = await apiRoot.me().get().execute();
  const customerId = me.body.id;

  const customerCarts = await apiRoot
    .carts()
    .get({ queryArgs: { where: `customerId="${customerId}"` } })
    .execute();
  const customerCart = customerCarts.body.results[0];

  const anonymousCarts = await apiRoot
    .carts()
    .get({ queryArgs: { where: `anonymousId="${anonymousId}"` } })
    .execute();
  const anonymousCart = anonymousCarts.body.results[0];

  if (customerCart && anonymousCart) {
    let currentVersion = customerCart.version;
    for (const item of anonymousCart.lineItems) {
      const addRes = await apiRoot
        .carts()
        .withId({ ID: customerCart.id })
        .post({
          body: {
            version: currentVersion,
            actions: [
              {
                action: 'addLineItem',
                productId: item.productId,
                variantId: item.variant.id,
                quantity: item.quantity
              }
            ]
          }
        })
        .execute();
      currentVersion = addRes.body.version;
    }

    await apiRoot
      .carts()
      .withId({ ID: anonymousCart.id })
      .delete({ queryArgs: { version: anonymousCart.version } })
      .execute();
  }
}
