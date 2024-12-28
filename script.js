const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");


async function wordSearch(){
    const val = document.querySelector(".inputValue").value;
    if(!val || val == ''){
        alert("Please enter any word to search");
        document.querySelector(".meanings").innerHTML = "";
    }else{
        try{
            const response = await fetch(url +val);
            if(response.status == 404){
                
                document.querySelector(".error").style.display = "block";
                document.querySelector(".dictionary").style.display = "none";
            }else{
                var data = await response.json();
                console.log(data);

                document.querySelector(".word").innerHTML = data[0].word;


                
                document.querySelector(".partOfSpeech").innerHTML = data[0].meanings[0].partOfSpeech;
                document.querySelector(".defintions").innerHTML = data[0].meanings[0].definitions[0].definition;

                const phonetic_word = data[0]?.phonetic;
                if(phonetic_word){
                    document.querySelector(".phonetic").innerHTML = data[0].phonetic;

                }else{
                    document.querySelector(".phonetic").innerHTML = "";

                }


                if(data[0].phonetics[0]?.audio){
                    sound.setAttribute("src", data[0].phonetics[0].audio);
                    document.querySelector(".volume").style.display = "block";
                }else{
                    sound.removeAttribute("src");
                    document.querySelector(".volume").style.display = "none";
                }

            

                const exa = data[0]?.meanings[0]?.definitions[0]?.example;
                if(exa === undefined || exa === null){
                    document.querySelector(".example").style.display = "none";
                }else{
                    document.querySelector(".example").style.display = "block";
                    document.querySelector(".word_exa").innerHTML = exa;
                }
                
                

                document.querySelector(".dictionary").style.display = "block";
                document.querySelector(".error").style.display = "none";
                
                
            }

        }catch(error){
            console.error("Error fetching data:", error);
            alert("An error occurred. Please try again later.");
            sound.removeAttribute("src");
            document.querySelector(".volume").style.display = "none";

        }
        



    }

}

function speakWord(){
    if(sound.src){
        sound.play();
    }
}