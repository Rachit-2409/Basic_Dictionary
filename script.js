let word = document.getElementById('word');
let word_meaning =  document.getElementById('word_meaning');
let example = document.getElementById('example');
let keyword =  document.getElementById('Keyword');
let btn = document.getElementById('btn');
let sound = document.getElementById('Sound-button');
let audio = document.querySelector('audio');

btn.addEventListener('click', async () => {
    try {
        let result = keyword.value.trim();
        if (result.length === 0) {
            alert("Enter a Word");
        } else {
            let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${result}`);
            if (!data.ok) {
                throw new Error('Invalid word');
            }
            let meaning = await data.json();
            console.log(meaning[0]);
            word.innerText = meaning[0].word;
            word_meaning.innerText = meaning[0].meanings[0].definitions[0].definition;
            keyword.value = "";

            let phonetics = meaning[0].phonetics.find(phonetic => phonetic.audio);
            if (phonetics && phonetics.audio) {
                let audio_src = audio.firstElementChild;
                audio_src.setAttribute('src', phonetics.audio);
                sound.style.display = 'inline'; 
            } else {
                sound.style.display = 'none';  
            }
        }
    } catch (error) {
        word.innerText = "Enter a Valid Word";
        word_meaning.innerText = " ";
        sound.style.display = 'none';  // Hide sound button in case of error
        console.error(error);
    }
});

sound.addEventListener('click', () => {
    audio.play();
});
