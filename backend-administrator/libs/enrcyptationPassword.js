import bcrypt from 'bcrypt'

export const enrcyptationPassword = async (password) => {
const salt = await bcrypt.genSalt(15);
const pass = await bcrypt.hash(password, salt)
return pass;
}

export const decryptpassword=async (flatPassword,hash) => {
  try{
     return await bcrypt.compare(flatPassword, hash);
  }catch(error){
    console.log(error)
  }
}
