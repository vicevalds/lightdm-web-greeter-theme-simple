fetch('backgrounds.json')
  .then(response => response.json())
  .then(data => { set_background(data); })
  .catch(error => console.error('Error fetching JSON:', error));

/*
Change it to the file name to force the background 
or leave it empty to make the selection random.
*/
const forceBackground = '';

function set_background(backgroundsData) {
  const selected_background = forceBackground || Object.keys(backgroundsData)[Math.floor(Math.random() * Object.keys(backgroundsData).length)];
  const { textColor, placeholderColor } = backgroundsData[selected_background];
    
  document.body.style.backgroundImage = `url(backgrounds/${selected_background})`;
  document.getElementById('input').style.color = textColor;
  document.styleSheets[0].insertRule(`#input::placeholder { color: ${placeholderColor}; }`, 0);
}

