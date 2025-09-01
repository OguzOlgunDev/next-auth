// i18n/request.ts
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const finalLocale = locale ?? "tr"; // ✅ fallback, ama artık hep string gelecek

  console.log(">>> Active locale in request.ts:", finalLocale);

  const load = async (path: string) =>
    (await import(`../locales/${finalLocale}/${path}.json`)).default;

  return {
    locale: finalLocale,
    messages: {
      pages: {
        home: await load("pages/home"),
        products: await load("pages/products"),
        product: await load("pages/product"),
        login: await load("pages/login"),
      },
      components: {
        productcard: await load("components/productcard"),
        logoutbutton: await load("components/logoutbutton"),
        socialloginbuttons: await load("components/socialloginbuttons"),
        cartempty: await load("components/cartempty"),
        cartitemcard: await load("components/cartitemcard"),
        mobilecheckoutbar: await load("components/mobilecheckoutbar"),
        ordersummary: await load("components/ordersummary"),

        recommendedlist: await load("components/recommendedlist"),
        shippingnotice: await load("components/shippingnotice"),
        navbar: await load("components/navbar"),
        addtocartbutton: await load("components/addtocartbutton"),
        addtocartsection: await load("components/addtocartsection"),
        breadcrumb: await load("components/breadcrumb"),
        filters: await load("components/filters"),
        productfeatures: await load("components/productfeatures"),
        productheader: await load("components/productheader"),
        productprice: await load("components/productprice"),
        productspecs: await load("components/productspecs"),
        relatedproducts: await load("components/relatedproducts"),
        reviews: await load("components/reviews"),
        trustsignals: await load("components/trustsignals"),
        whishlistbutton: await load("components/whishlistbutton"),
      },
    },
  };
});
