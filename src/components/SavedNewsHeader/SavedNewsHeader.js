import './SavedNewsHeader.css';
import React, { useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function SavedNewsHeader(props) {
  const user = React.useContext(CurrentUserContext)
  let firstEndings = ['ая', 'ые', 'ых'];
  let secondEndings = ['ья', 'ьи', 'ей'];
  let thirdEndings = ['му', 'м', 'м'];
  let fourthEndings = ['ому', 'им', 'им'];
  let fifthEndings = ['ому', 'ым', 'ым'];
  let sixthEndings = ['у', 'ам', 'ам'];
  const keywordArray = props.articles.map((elem) => elem.keyword);
  const uniqueArray = uniqueKeyWordArr();
  const [mostPopularWord, setMostPopularWord] = useState('');
  const [secondPopularWord, setSecondPopularWord] = useState('');
  let firstEnding = rightWordEndings(props.articles.length, firstEndings);
  let secondEnding = rightWordEndings(props.articles.length, secondEndings);
  let thirdEnding = rightWordEndings(uniqueArray.length-2, thirdEndings);
  let fourthEnding = rightWordEndings(uniqueArray.length-2, fourthEndings);
  let fifthEnding = rightWordEndings(uniqueArray.length, fifthEndings);
  let sixthEnding = rightWordEndings(uniqueArray.length, sixthEndings);

  React.useEffect(() => {
    mostPopularWords();
  });

  function rightWordEndings(n, endings) {
    let ending = (n%10 === 1&& n%100!==11 ? endings[0] : n%10>=2 && n%10<=4 &&(n%100<10 || n%100>=20) ? endings[1] : endings[2]);
    return ending;
  }

  function uniqueKeyWordArr() {
    const uniqueArray = [];
    for (let key of keywordArray) {
      if(!uniqueArray.includes(key)) {
        uniqueArray.push(key);
      }
    }

    return uniqueArray;
  }

  function mostPopularWords() {
    const numberOfArray = [];
    const keywordArray = props.articles.map((elem) => elem.keyword);
    const uniqueArr = uniqueArray.map((elem) => elem);
    let indexOfMax;

    for (let i=0; i<uniqueArr.length; i++) {
      numberOfArray.push(0);
    }

    for (let i=0; i<uniqueArr.length; i++) {
      for (let j=i; j<keywordArray.length; j++) {
        if(uniqueArr[i]===keywordArray[j]) {
          numberOfArray[i] += 1;
        }
      }
    }
    if(!mostPopularWord) {
      indexOfMax = numberOfArray.indexOf(Math.max.apply(null, numberOfArray));
      setMostPopularWord(uniqueArr[indexOfMax]);

      uniqueArr.splice(indexOfMax, 1);
      numberOfArray.splice(indexOfMax, 1);
      if (uniqueArray.length >= 2) {
        if(!secondPopularWord) {
          indexOfMax = numberOfArray.indexOf(Math.max.apply(null, numberOfArray));
          setSecondPopularWord(', '+uniqueArr[indexOfMax]);
          uniqueArr.splice(indexOfMax, 1);
        }
      }
    }
    
  }

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__caption">Сохранённые статьи</p>
      <h2 className="saved-news-header__title">{user.name}, у вас {props.articles.length} сохранённ{firstEnding} стат{secondEnding}</h2>
      {props.articles.length ? <p className="saved-news-header__text">По ключев{fifthEnding} слов{sixthEnding}: 
        <span className="saved-news-header__keyword">{` ${mostPopularWord}${secondPopularWord}`}</span>{uniqueArray.length-2>0 ? <span className="saved-news-header__text"> и</span> : ''}
        {uniqueArray.length-2>0 ?<span className="saved-news-header__keyword saved-news-header__keyword_no-uppercase">{` ${uniqueArray.length-2}-${thirdEnding} друг${fourthEnding}`}</span>:''}</p>: ''}
    </section>
  );
}

export default SavedNewsHeader;


