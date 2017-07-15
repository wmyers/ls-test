const get = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true);
    xhr.withCredentials = true;
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 ) { return }

      if (xhr.status !== 200) { 
        return reject('Error: ' + xhr.status) 
      }
      
      return resolve(xhr.responseText);
    };
  })
} 

const post = () => {
  return new Promise((resolve) => {
    setTimeout(() => return resolve('added successfully'), 1000);
  })
} 

const patch = () => {
  return new Promise((resolve) => {
    setTimeout(() => return resolve('edited successfully'), 1000);
  })
} 

const del = () => {
  return new Promise((resolve) => {
    setTimeout(() => return resolve('deleted successfully'), 1000);
  })
} 

export default {
  get,
  post,
  patch,
  'delete': del
};