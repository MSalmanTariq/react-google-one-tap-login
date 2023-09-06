import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const cookieStore = cookies()
  let  result = {};
  if(cookies().get('email')?.value && cookies().get('name')?.value && cookies().get('picture')?.value){
    result = {
      email:cookieStore.get('email')?.value,
      name:cookieStore.get('name')?.value,
      picture:cookieStore.get('picture')?.value,
    };
    // add any fetch from database here and add to result
  }else{
    cookies().delete('email');
    cookies().delete('name');
    cookies().delete('picture');
    if(cookies().get('email')?.value!=='' || cookies().get('name')?.value!=='' || cookies().get('picture')?.value!==''){
      throw new Error('cookie cannot be deleted');
    }
  }
  return NextResponse.json({result:result})
}
