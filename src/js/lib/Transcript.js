import xmljs from 'xml-js';

const API_KEY = "AIzaSyB6Yp5ERdjG0XO5x0yYm489n9is4odm6v4";
const VIDEO_URL = {
    part1: 'https://www.googleapis.com/youtube/v3/captions?videoId=', 
    part2: '&part=snippet&key='
}
const CAPTION_URL = {
    part1: 'https://video.google.com/timedtext?lang=', 
    part2: '&v='
}
var transcript = []

export default class Transcript {
    constructor(vid_id){
        this.vid_id = vid_id
    }
    async fetchTranscriptData () {
        const _vid_id = this.vid_id
        const response = await fetch(VIDEO_URL.part1 + _vid_id + VIDEO_URL.part2 + API_KEY);
        const json = await response.json();
        console.log(json)
        var index = []
        if(json){
            json.items.forEach((item, _indx) => {
                var _lang = item.snippet.language.toLowerCase()
                var _kind = item.snippet.trackKind.toLowerCase()
                console.log(_lang, _kind)
                
                if(_lang.includes('en') || _lang.includes('gb')){
                    if(_kind === 'standard'){index.push(_indx)}
                }
            })
            console.log(index)
            
            if(index.length == 1){
                var _snippet = json.items[index[0]].snippet
                const response2 = await fetch(CAPTION_URL.part1 + _snippet.language + CAPTION_URL.part2 + _vid_id);
                const text = await response2.text();

                const obj = xmljs.xml2js(text);
                console.log(obj)

                this.parseTranscript(obj)

            }else{console.log('None or More than 1 standard tracks')}
        }
        return await transcript;       
    }
    parseTranscript = (obj) => {
        var _element = obj.elements
        transcript = []
        console.log(_element)
        if(_element.length > 1){
            _element.forEach(e => {
                var txt = this.detectUTF8(e.elements[0].text);
                txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                transcript.push({
                    timeline: {
                        start: Number(e.attributes.start), 
                        dur: Number(e.attributes.dur), 
                        end: Number(e.attributes.start) + Number(e.attributes.dur),
                    }, 
                    text: txt
                })    
            });
            console.log(transcript)

        }else{
            this.parseTranscript(_element[0])
        }
    }
    detectUTF8 = (text) => {
        var res = text.match(/&#/);
        var txt;
        if(res){
            try {
                txt = text.replace(/&#([0-9]{1,3});/gi, function(match, numStr) {
                    var num = parseInt(numStr, 10); // read num as normal number
                    return String.fromCharCode(num);
                });
            } catch (e) {
                console.log("Kamala virhe " + e);
            }

        }else{txt = text}
        
        console.log(txt);
        
        return txt
    }

}