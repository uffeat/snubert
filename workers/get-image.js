

let imageResponse = await fetch('https://snubert.dev/_/api/get-image?key=key-1')
if (imageResponse.ok) {
  const blob = await imageResponse.blob()
  const src = URL.createObjectURL(blob);  // Creates local URL.
  const eImage = document.createElement('IMG')
  eImage.width = 200
  eImage.src = src
  cHome.addElement(eImage, {slot: 'main'})
}

