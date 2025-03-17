var findAnagrams = function (s, p) {
  const res = [];
  let wordsCount = new Array(26).fill(0)
  let diffCount=0
  for(let i=0;i<p.length;i++){
    wordsCount[p[i].charCodeAt()-"a".charCodeAt()]++ 
    diffCount++
    if( wordsCount[s[i].charCodeAt()-"a".charCodeAt()]){
        wordsCount[s[i].charCodeAt()-"a".charCodeAt()]--
        diffCount--
    }
  }

  for (let i = 0; i < s.length; i++) {
    if(diffCount===0){
        res.push(i)
    }
    else {
        
    }
  }
  return res;
};
findAnagrams("cbaebabacd", "abc");
