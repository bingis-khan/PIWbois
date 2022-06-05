
export const newImageURL = async () => 
    await fetch('https://picsum.photos/70/100').then(r => r.url);