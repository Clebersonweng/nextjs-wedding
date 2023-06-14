export async function search(options={}) { //?max_results=400
   const params = {
      ...options
   };

   if(options.nextCursor) {
      params.next_cursor = options.nextCursor;
      delete params.nextCursor;
   }
   const paramString = Object.keys(params).map(key=> `${key}=${encodeURIComponent(params[key])}`).join('&');
   
   const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search?${paramString}`, {
      method: "GET",
      headers: {
         Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')} }`
      },
   });

   return results;
}

export function mapImageResources(resources){
   return resources?.map((resource) => {
      const { width, height } = resource;
      return {
         id: resource.asset_id,
         title: resource.public_id,
         image: resource.secure_url,
         format: resource.format,
         folder: resource.folder,
         width,
         height,
      };
   });
}

export async function getFolders(options={}) {
   
   const results = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/folders`, {
      method: "GET",
      headers: {
         Authorization: `Basic ${Buffer.from(process.env.CLOUDINARY_API_KEY + ':' + process.env.CLOUDINARY_API_SECRET).toString('base64')} }`
      },
   }).then(r => r.json());

   return results;
}

export async function searchImage(imageName) {
   
   const results = await fetch(`${process.env.CLOUDINARY_URL}/image/upload/v1684242202/${imageName}`, {
      method: "GET",
      headers: {},
   })
   .then((response) => {
      response.arrayBuffer().then(function (buffer) {
         const url = window.URL.createObjectURL(new Blob([buffer]));
         const link = document.createElement("a");
   
         link.href = url;
         link.setAttribute("download", imageName + '.jpg'); //or any other extension
         document.body.appendChild(link);
         link.click();
      });
   })
   .catch(err => {
      console.error(err);
   });
   console.log("results",results)
   return results;
}