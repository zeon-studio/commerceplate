<h1 align=center>Commerceplate | NextJs + Shopify + Tailwind CSS + TypeScript Starter and Boilerplate</h1>

<p align=center>A free, production-ready Next.js template powered by Tailwind CSS and TypeScript, specifically designed for Shopify. Utilizes the Shopify Storefront API through GraphQL and providing everything you need to jumpstart your Next project and save valuable time.</p>

<p align=center>Made with ♥ by <a href="https://zeon.studio/">Zeon Studio</a></p>
<p align=center> If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center"> <a target="_blank" href="https://commerceplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-commerceplate-netlify-app/c4gacsjy7n?form_factor=desktop">Page Speed (97%)🚀</a>
</h2>

<p align=center>

  <a href="https://github.com/vercel/next.js/releases/tag/v15.3.0" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=NEXTJS&message=15.3&color=000&logo=nextjs" />
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
- next 15.3.0+
- node v20.10+
- npm v10.2+
- tailwind v4.1+

<!-- get Shopify storefront API access token-->

## 🛒 Retrieve Shopify Token & Add Demo Products

- To get the tokens needed, create a Shopify partner account.
  ![Screenshot_1](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/1.png)

- Now go to 'stores' and select 'Add store.' Create a development store using the option 'Create development store'.
  ![Screenshot_2](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/2.png)

- Click on import products.
  ![Screenshot_3](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/3.png)

- Locate the 'products' CSV file in the public folder of the repository and upload it for demo products.
  ![Screenshot_4](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/4.png)

- On the admin dashboard, click on ‘Settings’ at the bottom of the left sidebar.
  ![Screenshot_5](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/5.png)

- On the Settings page, click on ‘Apps and sales channels’ on the left sidebar.
  ![Screenshot_6](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/6.png)

- In the Apps and sales channels page that opens, click on ‘Develop apps’ on the top right.
  ![Screenshot_7](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/7.png)

- Now, on the App development page that opens, click on ‘Create an app’.
  ![Screenshot_8](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/8.png)

- A ‘Create an app’ popup opens. Fill in any name in the ‘App Name’ text box. In the App Developer text box, your name and email id is automatically fetched. Else type in the same email id you used while signing up for the Shopify store.
  ![Screenshot_9](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/9.png)

- Next, click on ‘Configure’ in the Storefront API integration section.
  ![Screenshot_10](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/10.png)

- In the Storefront API access scopes, select and check all the boxes and click on ‘Save’ and then ‘Install app’.
  ![Screenshot_11](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/11.png)

- Navigate to the 'API credentials' tab and locate three essential pieces of information. Subsequently, update your `.env` file by replacing the placeholder quotes("") in the `.env.example` file with your Shopify credentials.
  ![Screenshot_12](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/12.png)

- When adding your product, use the same alt title for images with the same color. This helps the first image appear as the color variant in the selector.
  ![Screenshot_13](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/13.png)
  ![Screenshot_14](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/14.png)

- We have the option to create additional collections for products.
  ![Screenshot_15](https://raw.githubusercontent.com/tfmurad/images-shopify-commerce/refs/heads/main/15.png)

## 🚀 Setting Up the Hero Slider

1. Go to the file `/src/config/config.json` in your Shopify project and find the 'hero_slider' section. You’ll see something like this:

   ```json
   "shopify": {
     "currencySymbol": "৳",
     "currencyCode": "BDT",
     "collections": {
       "hero_slider": "hidden-homepage-carousel",
       "featured_products": "featured-products"
     }
   }
   ```

2. Change the 'hero_slider' collection name to something of your choice.

3. Then, go to your Shopify Partner Dashboard, navigate to Products > Collections, and create a collection with the same name you set in the config file (e.g., 'hidden-homepage-carousel').

4. Add the products you want to display in the hero slider to this collection.

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
