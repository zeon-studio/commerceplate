<h1 align=center>Commerceplate | NextJs + Shopify + Tailwind CSS + TypeScript Starter and Boilerplate</h1>

<p align=center>A free, production-ready Next.js template powered by Tailwind CSS and TypeScript, specifically designed for Shopify. Utilizes the Shopify Storefront API through GraphQL and providing everything you need to jumpstart your Next project and save valuable time.</p>

<p align=center>Made with ♥ by<a href="https://zeon.studio/">Zeon Studio</a></p>
<p align=center> If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center"> <a target="_blank" href="https://commerceplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a  target="_blank" href="">Page Speed (80%)🚀</a>
</h2>

<p align=center>

  <a href="https://github.com/vercel/next.js/releases/tag/v14.0.2" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=NEXTJS&message=13.4&color=000&logo=nextjs" />
  </a>

  <a href="https://github.com/zeon-studio/commerceplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/commerceplate" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/commerceplate" alt="code size">

  <a href="https://github.com/zeon-studio/commerceplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/commerceplate" alt="contributors"></a>
</p>

## 📌 Key Features

- 🌐 Dynamic Products from Shopify Storefront API
- 💸 Checkout and Payments with Shopify
- 🌞 Automatic Light/Dark Mode
- 🚀 Fetching and Caching Paradigms
- 🔗 Server Actions for Mutations
- 🔐 User Authentication
- 🧩 Similar Products Suggestions
- 🔍 Search, Sort, Different Views Functionality
- 🏷️ Tags & Categories & Vendors & Price Range & Product Variants Functionality
- 🖼️ Single Product Image Zoom, Hover Effect, Slider
- 🛒 Cart & Easy editing options for cart items
- 📝 Product Description on Multiple Tabs
- 🔗 Netlify Setting Pre-configured
- 📞 Support Contact Form
- 📱 Fully Responsive
- 🔄 Dynamic Home Banner Slider
- 📝 Write and Update Content in Markdown / MDX
- ⌛ Infinite Product Load on Scrolling

### 📄 10+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 🛍️ Products
- 📦 Product Single
- 💡 Terms of services
- 📄 Privacy Policy
- 🔐 Login
- 🔑 Register
- 🚫 Custom 404

## 🚀 Getting Started

### 📦 Dependencies

- shopify
- next 13.5.4+
- node v20.10+
- npm v10.2+
- tailwind v3.3+

<!-- get Shopify storefront API access token-->

## 🛒 Retrieve Shopify Token & Add Demo Products

- To get the tokens needed, create a Shopify partner account.
  ![Screenshot_1](https://github.com/tfmurad/commerceplate/assets/145179606/7309e70c-905a-4f20-8ad0-bc73ef176e97)

- Now go to 'stores' and select 'Add store.' Create a development store using the option 'Create development store'.
  ![Screenshot_2](https://github.com/tfmurad/commerceplate/assets/145179606/f7bbeefd-61c5-44a5-97db-cd76dd9540f8)

- Complete the process by creating your development store. This involves following the steps shown in the image.
  ![Screenshot_3](https://github.com/tfmurad/commerceplate/assets/145179606/b774a0bf-1156-4dc2-995d-cb7ec5f403b1)

- Click on import products.
  ![Screenshot_4](https://github.com/tfmurad/commerceplate/assets/145179606/74c4e3fa-d9b3-47b8-b2e3-e6a1514ef8ac)

- Locate the 'products_export_1' CSV file in the public folder of the repository and upload it for demo products.
  ![Screenshot_5](https://github.com/tfmurad/commerceplate/assets/145179606/abc0ad01-fe98-483a-97d3-5e5ef240a349)

- On the admin dashboard, click on ‘Settings’ at the bottom of the left sidebar.
  ![Screenshot_6](https://github.com/tfmurad/commerceplate/assets/145179606/016346cd-75d9-4ee4-8703-810a0adcd209)

- On the Settings page, click on ‘Apps and sales channels’ on the left sidebar.
  ![Screenshot_7](https://github.com/tfmurad/commerceplate/assets/145179606/101e4145-6951-4658-a211-9c6680c27803)

- In the Apps and sales channels page that opens, click on ‘Develop apps’ on the top right.
  ![Screenshot_8](https://github.com/tfmurad/commerceplate/assets/145179606/164097b5-a36d-4f8a-a69c-5248cd505426)

- Now, on the App development page that opens, click on ‘Create an app’.
  ![Screenshot_10](https://github.com/tfmurad/commerceplate/assets/145179606/e8ef392b-0147-4dd6-a192-c643330cf7fd)

- A ‘Create an app’ popup opens. Fill in any name in the ‘App Name’ text box. In the App Developer text box, your name and email id is automatically fetched. Else type in the same email id you used while signing up for the Shopify store.
  ![Screenshot_11](https://github.com/tfmurad/commerceplate/assets/145179606/19a8bd57-8073-4e95-8a32-c11f00f082bc)

- Next, click on ‘Configure’ in the Storefront API integration section.
  ![Screenshot_12](https://github.com/tfmurad/commerceplate/assets/145179606/c49893e2-a058-4332-affc-82e81938df7e)

- In the Storefront API access scopes, select and check all the boxes and click on ‘Save’ and then ‘Install app’.
  ![Screenshot_13](https://github.com/tfmurad/commerceplate/assets/145179606/420f3fa6-5ec8-4daf-bd25-6e1a6c955b9a)

- Navigate to the 'API credentials' tab and locate three essential pieces of information. Subsequently, update your ``.env`` file by replacing the placeholder quotes("") in the ``.env.example`` file with your Shopify credentials.
  ![Screenshot_15](https://github.com/tfmurad/commerceplate/assets/145179606/516ea322-4151-40c0-a4d6-888973cd1915)
  ![Screenshot_16](https://github.com/tfmurad/commerceplate/assets/145179606/9d2777a6-997a-4212-bad3-b416d7636903)

- When adding your product, use the same alt title for images with the same color. This helps the first image appear as the color variant in the selector.
  ![Screenshot_18](https://github.com/tfmurad/commerceplate/assets/145179606/8eee60c4-07dd-48b2-bb8c-a86c77964483)

- We have the option to create additional collections for products.
  ![Screenshot_17](https://github.com/tfmurad/commerceplate/assets/145179606/8baae171-4e39-47bb-9839-e91a9a4f50c5)

### 👉 Install Dependencies

```bash
npm install
```

### 👉 Development Command

```bash
npm run dev
```

### 👉 Build Command

```bash
npm run build
```

<!-- reporting issue -->

## 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/commerceplate/issues). It’s possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/commerceplate/issues).

<!-- licence -->

## 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.com/zeon-studio/commerceplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.

## 💻 Need Custom Development Services?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/).
