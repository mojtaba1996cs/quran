const apiurl = 'https://mp3quran.net/api/v3/';
const reciters = "reciters";
const languages = "ar";


async function getReciters() {
    const chooseReciter = document.getElementById('chooseReciter');
    const res = await fetch(`${apiurl}${reciters}?language=${languages}`);
    const data = await res.json();
  //  return data;
 // console.log(data);
  chooseReciter.innerHTML = `<option value="">اختر القارئ</option>`;
 data.reciters.forEach(reciter => chooseReciter.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`); 
 chooseReciter.addEventListener('change', e => getMoshaf(e.target.value));
}


async function getMoshaf(reciter){
const chooseMoshaf = document.getElementById('chooseMoshaf');
 const res = await fetch(`${apiurl}${reciters}?language=${languages}&reciter=${reciter}`);
    const data = await res.json();
    const moshafs = data.reciters[0].moshaf
   chooseMoshaf.innerHTML = `<option value="" data-server="" data-surahlist="">اختر الرواية</option>`;
     moshafs.forEach(moshaf => chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahlist="${moshaf.surah_list}">${moshaf.name}</option>`) 
    chooseMoshaf.addEventListener('change', e => {
        const seclectedMosfah = chooseMoshaf.options[chooseMoshaf.selectedIndex];
        const surahserver = seclectedMosfah.dataset.server;
       const surahlist = seclectedMosfah.dataset.surahlist;
       getSurah(surahserver, surahlist);
    }
    );
}
async function getSurah(surahserver, surahlist){
const chooseSurah = document.getElementById('chooseSurah');
const res = await fetch(`https://mp3quran.net/api/v3/suwar`);
    const data = await res.json();
    const surahNames = data.suwar;
    surahlist = surahlist.split(',')
    chooseSurah.innerHTML = `<option value="">اختر السورة</option>`;
    surahlist.forEach (surah => {
        const padSurah = surah.toString().padStart(3, '0');
        
        surahNames.forEach(surahName => {
            if(surah == surahName.id){
            chooseSurah.innerHTML += `<option value="${surahserver}${padSurah}.mp3">${surahName.name}</option>`;
            }
    })

})

 chooseSurah.addEventListener('change', e => {
    const seclectedSurah = chooseSurah.options[chooseSurah.selectedIndex]; 
    playSurah(seclectedSurah.value);
 });
}
function playSurah(surahMp3){
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = surahMp3;
    audioPlayer.load();
    audioPlayer.play();
}
function playlive(channel){
if(Hls.isSupported()) {
        var video = document.getElementById('livevideo');
        var hls = new Hls();
        hls.loadSource(`${channel}`);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED,function() {
          video.play();
      });
     }
}

getReciters()