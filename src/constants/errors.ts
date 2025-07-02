export enum ERROR_CODE {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  TokenStoreInvalid = 'TOKEN_STORE_INVALID',
  RefreshTokenMissing = 'REFRESH_TOKEN_MISSING',
  RefreshFailed = 'REFRESH_FAILED',
  AddProductToCartFailed = 'ADD_PRODUCT_TO_CART_FAILED',
  InvalidCartIdOrCartVersion = 'INVALID_CART_ID_OR_CART_VERSION',
  DiscountCodeRequired = 'DISCOUNT_CODE_REQUIRED',
  ApplyDiscountCodeFailed = 'APPLY_DISCOUNT_CODE_FAILED',
  RemoveProductFromCartFailed = 'REMOVE_PRODUCT_FROM_CART_FAILED',
  FailedToFetchCart = 'FAILED_TO_FETCH_CART',
  FailedToFetchProducts = 'FAILED_TO_FETCH_PRODUCTS',
  EmailAlreadyExists = 'USER_WITH_THIS_EMAIL_ALREADY_EXISTS',
  MissingOrInvalidRequiredFields = 'MISSING_OR_INVALID_REQUIRED_FIELDS',
  UpdateItemQuantityFailed = 'UPDATE_ITEM_QUANTITY_FAILED',
  NotAuthenticated = 'NOT_AUTHENTICATED',
  MissingVersion = 'MISSING_VERSION',
  EmailTaken = 'EMAIL_TAKEN'
}

export const ERROR_MESSAGES = {
  [ERROR_CODE.InvalidCredentials]: 'Incorrect email or password.',
  [ERROR_CODE.TokenStoreInvalid]: 'Authentication token could not be retrieved.',
  [ERROR_CODE.RefreshTokenMissing]: 'Refresh token not found.',
  [ERROR_CODE.RefreshFailed]: 'Failed to refresh token.',
  [ERROR_CODE.AddProductToCartFailed]: 'Failed to add product to cart',
  [ERROR_CODE.InvalidCartIdOrCartVersion]: 'Invalid cartId or cartVersion',
  [ERROR_CODE.DiscountCodeRequired]: 'Discount code is required',
  [ERROR_CODE.ApplyDiscountCodeFailed]: 'Failed to apply discount code!',
  [ERROR_CODE.RemoveProductFromCartFailed]: 'Failed to remove product from cart',
  [ERROR_CODE.FailedToFetchCart]: 'Failed to fetch cart',
  [ERROR_CODE.FailedToFetchProducts]: 'Failed to fetch products',
  [ERROR_CODE.UpdateItemQuantityFailed]: 'Failed to update item quantity:',
  [ERROR_CODE.MissingOrInvalidRequiredFields]: 'Missing or invalid required fields',
  [ERROR_CODE.EmailAlreadyExists]: 'User with this email already exists!',
  [ERROR_CODE.NotAuthenticated]: 'Not authenticated',
  [ERROR_CODE.MissingVersion]: 'Missing version',
  [ERROR_CODE.EmailTaken]: 'Email is already taken'
};
