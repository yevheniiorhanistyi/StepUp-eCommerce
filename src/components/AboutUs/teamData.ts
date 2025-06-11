const teamMembers = [
  {
    name: 'Yevhenii Orhanistyi',
    role: 'Frontend Developer & Team Lead',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Yevhenii-Orhanistyi.jpg',
    github: 'https://github.com/yevheniiorhanistyi',
    linkedin: 'https://www.linkedin.com/in/yevhenii-orhanistyi-819094224/',
    contributions: [
      {
        image: '/images/contributions/github-pr-yevhenii.png',
        title: 'Leading the team and mentoring in Commercetools integration',
        description:
          'Yevhenii Orhanistyi served as the team lead and played a central role in driving the technical direction of the project. With prior experience in Commercetools and related technologies, he not only contributed significantly to the codebase but also guided the team through the complexities of integrating headless commerce. Yevhenii shared his knowledge generously, helped teammates overcome technical challenges, and ensured that everyone stayed aligned with best practices.'
      },
      {
        image: '/images/contributions/setup-development-environment.png',
        title: 'Project Initialization & Development Environment Setup',
        description:
          'Yevhenii Orhanistyi laid the foundation of the project by setting up the development environment, organizing the GitHub repository, and integrating key tools like ESLint, Prettier, Husky, Jest, and TypeScript. He also created the project in Commercetools enabling the team to collaborate effectively from day one.'
      },
      {
        image: '/images/contributions/main-page.png',
        title: 'Creating the Initial Main Page Layout and Structure',
        description: `Yevhenii Orhanistyi implemented the first version of the Main page, laying the structural and functional foundation for the application's landing experience. His work included building out the key layout components — such as promotional sections, brand showcases, popular categories, and featured products — while ensuring the page aligned with initial design specifications and passed all core functionality tests. This solid base later enabled further visual and experiential enhancements led by Marharyta Shyshkavets, who extended the page with new sections, animations, and visual refinements. Their collaboration helped transform the homepage into a polished, engaging entry point that reflects the brand’s value and supports a seamless user journey.`
      },
      {
        image: '/images/contributions/catalog-page.png',
        title: 'Implementing the Catalog Page with Filtering and Sorting',
        description:
          'Yevhenii Orhanistyi developed the Catalog Page, a central feature for product discovery in the eCommerce application. His implementation included dynamic product fetching via Commercetools, full-text search, filtering by attributes, sorting options, and intuitive category-based navigation. This contribution established a scalable foundation for product browsing, significantly improving the shopping experience and enabling users to explore the catalog with speed, precision, and ease.'
      },
      {
        image: '/images/contributions/branches.png',
        title: 'Ensuring Repository Hygiene & Git Branch Management',
        description:
          'Yevhenii consistently maintained the cleanliness and structure of our GitHub repository throughout the project. He regularly reminded team members to delete outdated branches, kept the main branch organized, and ensured that all contributions followed proper naming conventions and workflows. Thanks to his attention to detail and discipline in version control, our team was able to collaborate efficiently without technical debt or merge chaos.'
      }
    ]
  },
  {
    name: 'Dzmitry Drevich',
    role: 'Frontend Developer & Scrum Master',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Dzmitry-Drevich.jpg',
    github: 'https://github.com/rasimaru',
    linkedin: 'https://www.linkedin.com/in/dzmitrydrevich',
    contributions: [
      {
        image: '/images/contributions/jira.png',
        title: 'Setting up and managing the team’s project workflow in Jira',
        description:
          'Dzmitry Drevich played a key role in establishing an effective development workflow by setting up and managing the project in Jira. He configured the working environment, created and organized tasks, and helped the team stay aligned through well-structured sprints and regular planning. Thanks to his efforts, the team was able to collaborate efficiently, stay focused on priorities, and ensure steady progress throughout all four sprints.'
      },
      {
        image: '/images/contributions/registration.png',
        title: 'Implementing the User Registration Flow',
        description:
          'Dzmitry Drevich developed the user registration page, laying the foundation for the authentication system and onboarding process. As one of the first functional components in the application, this two-step form introduced structured validation, user-friendly navigation, and address configuration. His implementation helped define early standards for form handling and user interaction, providing a solid base for future account-related features and setting the tone for a seamless user experience across the app.'
      },
      {
        image: '/images/contributions/profile-page.png',
        title: 'Developing the User Profile Page',
        description:
          'Dzmitry Drevich implemented the User Profile page, enabling users to view and manage their personal information in a clear and intuitive interface. The page supports seamless transitions between view and edit modes, real-time validation, and full address management. This contribution played a vital role in empowering users with greater control over their data and improving overall trust in the application.'
      }
    ]
  },
  {
    name: 'Marharyta Shyshkavets',
    role: 'Frontend Developer & UI Designer',
    bio: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.',
    image: '/images/members/Marharyta-Shyshkavets.jpg',
    github: 'https://github.com/margomint',
    linkedin: 'https://www.linkedin.com/in/marharyta-shyshkavets-18b866363/',
    contributions: [
      {
        image: '/images/contributions/ui-design.png',
        title: `Designing the project's initial Figma prototype`,
        description: `Marharyta Shyshkavets created the original Figma design for the application, which served as the visual foundation for the entire team. The prototype helped clarify the project's structure, align expectations, and ensure a cohesive user experience across all pages. While the final implementation evolved over time, the design system and layout principles established in the early stages remained central to the development process.`
      },
      {
        image: '/images/contributions/login-page.png',
        title: 'Login Page Development & First Steps into Authentication Flow',
        description:
          'Marharyta Shyshkavets took the initiative to implement the Login page — one of the first and core features of the authentication flow — at a time when the internal mechanics of token handling and Commercetools integration were still unfamiliar. Despite limited experience with these technologies, she confidently tackled the challenge, building a responsive and user-friendly login form with real-time validation, password visibility toggling, and navigation to registration.Later, with the guidance of Yevhenii Orhanistyi, the solution evolved through collaborative refinement into a fully integrated authentication flow. This moment reflects not only technical growth but also strong teamwork and her proactive attitude toward learning.'
      },
      {
        image: '/images/contributions/detailed-product-page.png',
        title: 'Building the Detailed Product Page and Enriching Product Data',
        description:
          'Marharyta Shyshkavets implemented the Detailed Product Page. The page features price display with sale handling, an image slider, and a full-screen image modal for detailed viewing. In addition to technical implementation, Marharyta enriched the project by updating and creating a wide range of product entries in Commercetools, ensuring the application looked vibrant, realistic, and ready for demonstration. Her contribution significantly improved both the visual appeal and functional completeness of the storefront.'
      },
      {
        image: '/images/contributions/improving-visual-quality.png',
        title: 'Improving Visual Quality and User Experience on the Homepage',
        description:
          'Marharyta Shyshkavets played a key role in elevating the design and usability of the homepage through continuous refinements and attention to visual detail. She ensured better responsiveness and style consistency. Beyond direct contributions, she proactively guided teammates to fix visual issues and maintain design standards, helping shape a polished and cohesive user experience across the application.'
      }
    ]
  }
];

export default teamMembers;
