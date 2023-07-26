const Wrapper = Document.QuerySelector(".Wrapper"),
SearchInput = Wrapper.QuerySelector("Input"),
Volume = Wrapper.QuerySelector(".Word I"),
InfoText = Wrapper.QuerySelector(".Info-Text"),
Synonyms = Wrapper.QuerySelector(".Synonyms .List"),
RemoveIcon = Wrapper.QuerySelector(".Search Span");
let Audio;

 

function Data(Result, Word){
    If(Result.Title){
        InfoText.InnerHTML = `Can't Find The Meaning Of <Span>"${Word}"</Span>. Please, Try To Search For Another Word.`;
    }else{
        Wrapper.ClassList.Add("Active");
        let Definitions = Result[0].Meanings[0].Definitions[0],
        Phontetics = `${Result[0].Meanings[0].PartOfSpeech}  /${Result[0].Phonetics[0].Text}/`;
        Document.QuerySelector(".Word P").InnerText = Result[0].Word;
        Document.QuerySelector(".Word Span").InnerText = Phontetics;
        Document.QuerySelector(".Meaning Span").InnerText = Definitions.Definition;
        Document.QuerySelector(".Example Span").InnerText = Definitions.Example;
        Audio = New Audio("Https:" + Result[0].Phonetics[0].Audio);

 

        If(Definitions.Synonyms[0] == Undefined){
            Synonyms.ParentElement.Style.Display = "None";
        }Else{
            Synonyms.ParentElement.Style.Display = "Block";
            Synonyms.InnerHTML = "";
            For (Let I = 0; I < 5; I++) {
                Let Tag = `<Span Onclick="Search('${Definitions.Synonyms[I]}')">${Definitions.Synonyms[I]},</Span>`;
                Tag = I == 4 ? Tag = `<Span Onclick="Search('${Definitions.Synonyms[I]}')">${Definitions.Synonyms[4]}</Span>` :
Tag;
                Synonyms.InsertAdjacentHTML("Beforeend", Tag);
            }
        }
    }
}

 

Function Search(Word){
    FetchApi(Word);
    SearchInput.Value = Word;
}

 

Function FetchApi(Word){
    Wrapper.ClassList.Remove("Active");
    InfoText.Style.Color = "#000";
    InfoText.InnerHTML = `Searching The Meaning Of <Span>"${Word}"</Span>`;
    Let Url = `Https://Api.Dictionaryapi.Dev/Api/V2/Entries/En/${Word}`;
    Fetch(Url).Then(Response => Response.Json()).Then(Result => Data(Result, Word)).Catch(() =>{
        InfoText.InnerHTML = `Can't Find The Meaning Of <Span>"${Word}"</Span>. Please, Try To Search For Another Word.`;
    });
}

 

SearchInput.AddEventListener("Keyup", E =>{
    Let Word = E.Target.Value.Replace(/S+/G, ' ');
    If(E.Key == "Enter" && Word){
        FetchApi(Word);
    }
});

 

Volume.AddEventListener("Click", ()=>{
    Volume.Style.Color = "#4D59FB";
    Audio.Play();
    SetTimeout(() =>{
        Volume.Style.Color = "#999";
    }, 800);
});

 

RemoveIcon.AddEventListener("Click", ()=>{
    SearchInput.Value = "";
    SearchInput.Focus();
    Wrapper.ClassList.Remove("Active");
    InfoText.Style.Color = "#9A9A9A";
    InfoText.InnerHTML = "Type Any Existing Word And Press Enter To Get Meaning, Example, Synonyms, Etc.";
});