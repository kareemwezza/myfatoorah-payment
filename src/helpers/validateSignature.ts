import { createHmac } from 'crypto';

export function validateSignature(body: any, myFatoorahSignature: string, myFatoorahSecret: string): Promise<boolean> {
  const unOrderedData = body['Data'];
  const orderedArray = Object.keys(unOrderedData).sort((a, b) => a.localeCompare(b));
  let orderedString = '';
  orderedArray.forEach((key) => {
    unOrderedData[key] = unOrderedData[key] ? unOrderedData[key] : '';
    orderedString += `${key}=${unOrderedData[key]},`;
  });
  orderedString = orderedString.slice(0, -1);
  const result = createHmac('sha256', myFatoorahSecret).update(orderedString).digest();
  const hash = result.toString('base64');

  return new Promise((resolve, reject) => {
    if (hash === myFatoorahSignature) {
      resolve(true);
    } else {
      reject("My Fatoorah signature isn't valid");
    }
  });
}
