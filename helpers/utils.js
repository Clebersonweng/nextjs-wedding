
export async function getImageAttachment(id) {
   return await cloudinary.url(id, {
      flags: "attachment:imgname"
   })
};

export function lowerCase(text) {
   return text.toLowerCase();
};

// put inside square brackets you character, what you whant replace
export function cleanCharacters(text,charReplace='/[#_/*.]/g'){
   let resultText =  text.replace(charReplace,'')

   return resultText;
}

export const parseJson = async response => {
   const text = await response.text()
   try {
      const json = JSON.parse(text)
      return json
   } catch (err) {
      throw new Error("Did not receive JSON, instead received: " + text)
   }
}