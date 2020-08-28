import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeatureMovie from './components/FeatureMovie';
import Header from './components/Header';
import './App.css';

export default () => {

  const [ movieList, setMovieList ] = useState([]);
  const [ featureData, setFeatureData ] = useState(null);
  const [ blackHeader, setBlackHeader ] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // pega a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pega o filme em destaque
      let originals = list.filter(i => i.slug === 'originals');
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randonChosen];

      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(choseInfo);

    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

        <Header black={blackHeader} />

        {featureData &&
          <FeatureMovie item={featureData} />
        }

        <section className="lists">
          {movieList.map((item, key) => (
              <MovieRow key={key} title={item.title} items={item.items} />
          ))}
        </section>

        <footer>
          Projeto de interface do netflix<br />
          Direitos de imagens para o netflix <br />
          Dados pegos do site Themoviedb.org
        </footer>

        {movieList.length <= 0 &&
          <div className="loading">
            <img src="https://cdn.lowgif.com/full/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="Carregando" />
          </div>
        }
    </div>
  );
}