export const getNavLinkMenu = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/rootmenu/menus`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("API Error Response:", errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
      return [];
    }

    // Try to parse the response and log it if there's an error
    let data;
    try {
      const text = await response.text();
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Invalid JSON response from server");
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error("Invalid data structure:", data);
      throw new Error("Invalid data structure received from server");
    }

    if (!data[0]?.menus) {
      console.error("No menus found in response:", data[0]);
      throw new Error("No menus found in response");
    }
    return data[0].menus;
  } catch (error) {
    console.error("getNavLinkMenu error:", error);
    // throw error;
  }
};

export const getsubCategory = async (subcategory) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subcategory/?where[subcategoryslug][equals]=${subcategory}&depth=3&draft=false&locale=undefined`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
      return;
    }

    const data = await response.json();
    return data?.docs[0];
  } catch (error) {
    console.error("getsubCategory error:", error);
    // throw error;
  }
};

export const getSubCategoryProductdata = async (subcategory, filterBrand, finish) => {
  try {
    
    const params = new URLSearchParams({
      [`where[Subcategory.subcategoryslug][equals]`]: subcategory,
      'depth': '2',
      'draft': 'false',
      'locale': 'undefined',
      'limit': '8'
    });
  
    // Only add brand filter if it exists
    if (filterBrand) {
      params.append(`where[brand.brandslug][equals]`, filterBrand);
    }
  
    // Only add finish filter if it exists
    if (finish) {
      params.append(`where[Finishes.finishslug][equals]`, finish);
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Products/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
      return;
    }
    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("getProductdata error:", error);
    // throw error;
  }
};

export const getProductData = async (product) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Products?depth=2&draft=false&locale=undefined&where[producturl][equals]=${product}&sort=title`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
      return;
    }

    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data?.docs[0];
  } catch (error) {
    console.error("getProductdata error:", error);
    // throw error;
  }
};

export const getHandlesData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Products?select[title]=true&select[image]=true&select[completeurl]=true&where[Category.categoryslug][equals]=handles&limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      return [];
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data?.docs;
  } catch (error) {
    console.error("getHnadlesData error:", error);
    // throw error;
  }
};

export const getBrandsData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
      return [];
    }

    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data?.docs;
  } catch (error) {
    console.error("getBrandsData error:", error);
    // throw error;
  }
};

export const getCatalogueData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/catalogue`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      console.error("response is not ok", response);
      return [];
    }

    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data?.docs;
  } catch (error) {
    console.error("getCatalogueData error:", error);
    // throw error;
  }
};

export const otherCategoriesData = async (subcategory = "") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/subcategory/?select[title]=true&select[subcategoryslug]=true&select[fullslug]=true&select[categoryslug]=true&where[subcategoryslug][not_equals]=${subcategory}&depth=2&draft=false&locale=undefined`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // "Authorization":"",
        },
        cache: "no-cache",
      }
    );

    if (!response.ok) {
      return [];
      // const errorText = await response.text();
      // console.error('API Error Response:', errorText);
      // throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Try to parse the response and log it if there's an error
    const data = await response.json();
    return data?.docs;
  } catch (error) {
    console.error("otherCategoriesData error:", error);
    // throw error;
  }
};

export const getBespokeData = async () => {
  try {
    const response = await fetch(
      `https://musing-nobel.97-74-95-14.plesk.page//api/bespoke/1?depth=1&draft=false&locale=undefined`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getBespokeData error:", error);
    // throw error;
  }
};


// export const getBrandProductData = async (brand="", finish="") => {

//   try {
//     const response =
//       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/?select[title]=true&select[image]=true&select[completeurl]=true&where[brand.brandslug][equals]=${brand}&depth=2&draft=false&locale=undefined&limit=12`);
//     if (!response.ok) return [];
//     const data = await response.json();
//     return data.docs;
//   } catch (error) {
//     console.error("getHoldProductData error:", error);
//     // throw error;
//   }
// };

export const getBrandProductData = async (brand = "", finish = "") => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/Products/`);
    const params = new URLSearchParams({
      'select[title]': 'true',
      'select[image]': 'true',
      'select[completeurl]': 'true',
      'depth': '2',
      'draft': 'false',
      'locale': 'undefined',
      'limit': '12',
      'where[brand.brandslug][equals]': brand
    });

    if (finish) {
      params.append('where[Finishes.finishslug][equals]', finish);
    }
    url.search = params.toString();

    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data.docs;
  } catch (error) {
    console.error("getBrandProductData error:", error);
    return [];
  }
};

export const getHoldData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands/1?depth=1&draft=false&locale=undefined`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getHoldData error:", error);
    retrun ;
  }
};

export const getBrandPageData = async (brand = "") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/brands?where[brandslug][equals]=${brand}`
    );
    if (!response.ok) return [];  
    const data = await response.json();
    return data?.docs[0];
  }
  catch (error) {
    console.error("getBrandPageData error:", error);
    return;
  }
}

export const getBrandFinshes = async (brand = "") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Products/BrandFinishes/${brand}/Finishes`
    );    
    if (!response.ok) return [];  
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error("getBrandPageData error:", error);
    return; 

  }
}


export const getBrandCategoryData = async (brand = "") => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Products/brandsubcategories/${brand}/subcategories`
    );    
    if (!response.ok) return [];  
    const data = await response.json();
    return data;
  }
  catch (error) {
    console.error("getBrandPageData error:", error);
    return; 

  }
}

export const getHomeBannerData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/home?depth=2`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data?.docs;
  } catch (error) { 
    console.error("getHomeBannerData error:", error);
    return [];
  }
}


export const getTermsandConditons = async () => {
  try {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/termsandcondition/1?depth=1&draft=false&locale=undefined`)
    if(!response.ok) return {};
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getTermsandConditons error :", error);
    return;
  }
}

export const getFAQData = async () =>{
  try {
    const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/faq/1?depth=1&draft=false&locale=undefined`)
    if(!response.ok)return {};
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("getFAQData ",error)
    return {};
  }
}

export const getContactData = async () => {
 try {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ourcontactus/1?depth=1&draft=false&locale=undefined`)
   if(!response.ok){
     return {};
   }
   const data = await response.json();
   return data;
 } catch (error) {
    console.error("getContactData ::",error);
    return {};
 }
}

export const getContactFormData = async () =>{
try {
  const response = await fetch (`${process.env.NEXT_PUBLIC_API_URL}/api/dynamicform/1?depth=1&draft=false&locale=undefined`)
  if(!response.ok){
    return {};
  }
  const data = await response.json();
  return data;
} catch (error) {
  console.error("getContactFormData ::",error);
  return {};
}
}