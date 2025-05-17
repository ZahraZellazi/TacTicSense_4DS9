import background01 from "../assets/images/banner/background01.jpg";
import player from "../assets/images/banner/player.png";
import ball from "../assets/images/banner/ball.png";
import frontParticles from "../assets/images/banner/front_particles.png";
import backParticles from "../assets/images/banner/back_particles.png";
import player01 from "../assets/images/player/player01.jpg";
import player02 from "../assets/images/player/player02.jpg";
import player03 from "../assets/images/player/player03.jpg";
import player04 from "../assets/images/player/player04.jpg";
import player05 from "../assets/images/player/player05.jpg";

import gallery01 from "../assets/images/gallery/gallery.jpg";
import gallery02 from "../assets/images/gallery/gallery02.jpg";
import gallery03 from "../assets/images/gallery/gallery03.jpg";
import gallery04 from "../assets/images/gallery/gallery04.jpg";
import gallery021 from "../assets/images/gallery/gallery021.jpg";
import gallery031 from "../assets/images/gallery/gallery031.jpg";
import gallery041 from "../assets/images/gallery/gallery041.jpg";
import five from "../assets/images/gallery/five.jpg";
//import medium01 from '../assets/images/gallery/medium_01.jpg';
//import medium03 from '../assets/images/gallery/medium_03.jpg';

import tShirtIcon from "../assets/images/icons/tShirt.png";
const Banner = () => {
  return (
    <>
      <div className="banner" id="layerSlider" style={{ width: "100%" }}>
        <div
          className="ls-slide"
          data-ls="transition3d: 33,15; slidedelay: 8000 ; durationin:0;"
        >
          <img src={background01} className="ls-bg" alt="Slide background" />

          <div
            className="ls-l layercontent01"
            style={{ top: "50%", left: "50%", zIndex: 4 }}
            data-ls="offsetxin:left; offsetxout:right; durationin: 4000; parallaxlevel: 8;"
          >
            <img
              src={player}
              alt="innerimage"
              className="img-responsive"
              style={{ maxWidth: " 100%" }}
            />
          </div>
          <img
            src={ball}
            alt="innerimage"
            className="ls-l layercontent02"
            style={{ zIndex: 5 }}
            data-ls="offsetxin: right; offsetxout:left; rotatein:-360; easingin: easeoutquart; durationin: 4000; delayin: 250; parallaxlevel: -5;"
          />
          <img
            src={frontParticles}
            alt="particles"
            className="ls-l"
            style={{ zIndex: 3, left: 0 }}
            data-ls="offsetxin: left; offsetxout:left; scalexin:50; easingin: easeoutquart; durationin: 3000; delayin: 250;"
          />
          <img
            src={backParticles}
            alt="particles"
            className="ls-l"
            style={{ zIndex: 3, left: "50%" }}
            data-ls="offsetxin: left; offsetxout:left; scalein:90; easingin: easeoutquart; durationin: 3000; delayin: 250;"
          />

          <h2
            className="ls-l bannertext layercontent03"
            data-ls="offsetxin:left; rotatexin:90 ; durationin: 3500;"
          >
            action
          </h2>

          <h2
            className="ls-l bannertext01 italic01 layercontent04"
            data-ls="offsetxin:left; scalexin:9; durationin: 4000;"
          >
            starts
          </h2>
          <h4
            className="ls-l bannertext02 layercontent05"
            data-ls="offsetxin:left; rotatexin:90 ; durationin: 4500;"
          >
            from
          </h4>

          <h2
            className="ls-l bannertext01 layercontent06"
            style={{ left: "87%", top: "760px" }}
            data-ls="offsetxin:left; flipxin:90 ; durationin: 5000;"
          >
            21<sup>st</sup>
          </h2>
          <h6
            className="ls-l bannertext03 layercontent07"
            data-ls="offsetxin:left; flipxin:90 ; durationin: 6000;"
          >
            july , 2015
          </h6>
        </div>
      </div>
      <div className="banner-text">
        <div className="container">
          <div className="row">
            action start from 21<sup>st</sup> july , 2015.
          </div>
        </div>
      </div>
    </>
  );
};
export function Home() {
  return (
    <>
      <Banner />

      <div className="banner-text">
        <div className="container">
          <div className="row">
            action start from 21<sup>st</sup> july , 2015.
          </div>
        </div>
      </div>
      <section className="booking bg-smallwhite">
        <div className="container">
          <div className="booking-fig">
            <h2>SCC football club</h2>
          </div>
          <div className="booking-content">
            <a href="#" className="btn btn-white">
              Read More
            </a>
            <a href="bookTicket.html" className="btn btn-red">
              Book My Ticket
            </a>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="container">
          <div className="row">
            <h2 className="heading">
              About <span>SCC</span>
            </h2>

            <div className="about-wrap">
              <div className="tab-content nav-content">
                <p role="tabpanel" className="tab-pane fade" id="matches">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                  amet cumque quo at eius nulla, voluptates assumenda saepe,
                  consequatur fuga sapiente. Quas optio adipisci dolor possimus
                  quos, maiores aliquid placeat! Nemo ab praesentium voluptatum,
                  exercitationem ad quo tempore quam temporibus voluptates odio,
                  qui laborum pariatur perferendis! Sapiente, itaque facilis
                  deleniti unde?
                </p>

                <p
                  role="tabpanel"
                  className="tab-pane active fade in"
                  id="static"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                  amet cumque quo at eius nulla, voluptates aliquid placeat!
                  Nemo ab praesentium voluptatum, exercitationem ad quo tempore
                  quam temporibus voluptates odio, qui laborum pariatur
                  perferendis! Sapiente, itaque facilis deleniti unde?
                </p>

                <p role="tabpanel" className="tab-pane fade" id="traning">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quos, maiores aliquid placeat! Esse nemo ab praesentium
                  voluptatum, exercitationem ad quo tempore quam temporibus
                  voluptates odio, qui laborum pariatur perferendis! Sapiente,
                  itaque facilis deleniti unde? Aspernatur expedita recusandae
                  ullam autem ducimus consectetur sed iure sequi ratione
                  architecto optio consequuntur atque dolor dolores asperiores
                  illum, quam hic ab?
                </p>
              </div>

              <div className="nav-header" id="aboutTab">
                <ul className="nav nav-tabs clearfix" role="tablist">
                  <li>
                    <a
                      href="#matches"
                      aria-controls="matches"
                      role="tab"
                      data-toggle="tab"
                    >
                      Matches
                    </a>
                  </li>
                  <li className="active">
                    <a
                      href="#static"
                      aria-controls="static"
                      role="tab"
                      data-toggle="tab"
                    >
                      Statics
                    </a>
                  </li>
                  <li>
                    <a
                      href="#traning"
                      aria-controls="traning"
                      role="tab"
                      data-toggle="tab"
                    >
                      Traning
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LatestResults />
      <BookingSection />
      <NewsAndHistory />
      <PlayersSection />
      <GallerySection />
    </>
  );
}

const LatestResults = () => {
  return (
    <>
      <section className="latestResult">
        <div className="container">
          <div className="row">
            <h2 className="heading">
              latest <span>result</span>
            </h2>

            <div className="latestResult-wrap">
              <h4>UEFA Champions League</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim,
                nemo tenetur magnam eveniet sed aut...
              </p>
            </div>

            <div className="result clearfix">
              {/* Team 1 */}
              <div className="result-details">
                <div className="content">
                  <h4>FC Dragons</h4>
                  <p>Lose</p>
                  <p>Shannon Skelly (23)</p>
                </div>
                <div className="figure">
                  <div className="team-logo">
                    <div
                      className="teamLogoImg"
                      style={{
                        backgroundImage: "url(images/team-logo/logo01.png)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Score */}
              <div className="result-count">
                <div className="count-number">
                  <span className="lose-team">1</span> <span>-</span>{" "}
                  <span className="win-team">3</span>
                </div>
                <div className="dateTime">
                  <div className="dateTime-container">
                    <span className="date">May 16, 2015</span>{" "}
                    <span className="time">15:30pm</span>
                  </div>
                  <div className="country-wrap">
                    <span className="field">Wbeysley Stadium</span>{" "}
                    <span className="country">(London)</span>
                  </div>
                </div>
              </div>

              {/* Team 2 */}
              <div className="result-details">
                <div className="content contentresult">
                  <h4>FC Zulu Ninjas</h4>
                  <p>Win</p>
                  <p>Leland Lagos (29)</p>
                  <p>Leland Lagos (39)</p>
                </div>
                <div className="figure figresult">
                  <div className="team-logo">
                    <div
                      className="teamLogoImg"
                      style={{
                        backgroundImage: "url(images/team-logo/logo02.png)",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="center">
                <a href="#" className="btn btn-red score-btn">
                  Score board
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Match Schedule Section */}
      <section className="matchSchedule">
        <div className="container">
          <div className="row">
            <h2 className="heading">
              match <span>schedule</span>
            </h2>
            <p className="headParagraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              debitis mollitia...
            </p>

            <div className="matchSchedule_details row">
              <div className="match_next right-triangle">
                <div className="wrap_match_next right-triangle">
                  <div className="right-padding">
                    <h4 className="headline03">Next Match</h4>
                    <p>Lorem ipsum dolor sit amet...</p>
                  </div>
                </div>
              </div>

              <div className="match_versus">
                <div className="bg-blackimg match_versus02">
                  <div className="nextmatchDetails">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing
                      elit...
                    </p>
                    <div className="wrap-logo clearfix">
                      <div className="logo-match">
                        <img src="images/matchResult/logo01.png" alt="Team 1" />
                      </div>
                      <div className="match_vs">vs</div>
                      <div className="logo-match">
                        <img src="images/matchResult/logo02.png" alt="Team 2" />
                      </div>
                    </div>
                    <p className="match_dtls">October 31, 2015 | 18:25PM</p>
                    <p className="match_dtls">Wemsddley Stadium (London)</p>
                  </div>
                </div>
              </div>

              <div className="match_timing">
                <ul className="counter-wrap">
                  <li>
                    <span>12</span>days
                  </li>
                  <li>
                    <span>18</span>hours
                  </li>
                  <li>
                    <span>27</span>minutes
                  </li>
                  <li>
                    <span>55</span>seconds
                  </li>
                </ul>
              </div>
            </div>

            {/* Upcoming Matches List */}
            <div className="matchSchedule_details row">
              <div className="match_versus-wrap">
                <div className="wrap_match-innerdetails">
                  <ul className="home_tInfo scrollable">
                    {[
                      ["FC Militant Flyers", "fc Black & White Blasters"],
                      ["FC Crimson Buccaneers", "fc Poison Reapers"],
                      ["FC Muffin Kickers", "fc Ghost Assassins"],
                      ["FC Demolition Rockets", "fc Wind Flyers"],
                      ["FC Alpha Monsters", "fc Delta Miners"],
                      ["FC Zulu Ninjas", "fc Sneaky Mutants"],
                    ].map((match, index) => (
                      <li key={index}>
                        <a href="#">
                          <ul className="t_info match_info01 headline01 clearfix">
                            <li>{index + 1}</li>
                            <li>
                              <div className="headline01 clearfix">
                                <span>{match[0]}</span>
                                <span className="vs">vs</span>
                                <span>{match[1]}</span>
                              </div>
                              <div className="paragraph02 clearfix">
                                <span>August 24, 2015</span>
                                <span>18:25pm</span>
                              </div>
                            </li>
                          </ul>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="match_next">
                <div className="wrap_match_next left_triangle">
                  <div className="left_padding">
                    <h4 className="headline03">Upcoming Feature</h4>
                    <p>Lorem ipsum dolor sit amet...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Point Table */}
            <div className="matchSchedule_details row">
              <div className="match_next">
                <div className="wrap_match_next right-triangle">
                  <div className="right-padding">
                    <h4 className="headline03">Point Table</h4>
                    <p>Lorem ipsum dolor sit amet...</p>
                  </div>
                </div>
              </div>
              <div className="match_versus-wrap">
                <div className="wrap_match-innerdetails">
                  <ul className="point_table scrollable">
                    {[
                      "FC Silver Bullets",
                      "FC Spinning Slammers",
                      "FC Crimson Executioners",
                      "FC Shaolin Robots",
                    ].map((team, index) => (
                      <li className="clearfix" key={index}>
                        <div className="subPoint_table">
                          <div className="headline01 smallpoint">
                            {index + 1}
                          </div>
                          <div className="headline01 largepoint">{team}</div>
                          <div className="headline01 smallpoint row">
                            <span>p</span>
                            <span>10</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const BookingSection = () => {
  return (
    <>
      <section className="booking bookticket">
        <div className="container">
          <div className="booking-fig">
            <h2>SCC football club</h2>
          </div>
          <div className="booking-content">
            <a href="#" className="btn btn-white">
              book now
            </a>
          </div>
        </div>
      </section>

      <section className="latestvideo">
        <div className="container">
          <div className="row">
            <h2 className="heading">
              latest <span>video</span>
            </h2>
            <p className="headParagraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              debitis mollitia qui libero voluptate ratione, molestias!
              Necessitatibus voluptatem temporibus doloremque non, vel ipsam,
              nesciunt dolores consequatur, est tempora ut! Est? Lorem ipsum
              dolor sit amet, consectetur adipisicing elit. Nihil debitis
              mollitia qui libero voluptate ratione, molestias! Necessitatibus
              voluptatem temporibus doloremque non, vel ipsam, nesciunt dolores
              consequatur, est tempora ut! Est.
            </p>

            <div className="video-wrap clearfix">
              <div className="video-content clearfix">
                <a className="btn-up" href="#"></a>
                <ul
                  className="videoLive clearfix"
                  id="videoSlide"
                  role="tablist"
                >
                  {[
                    "W7qWa52k-nE",
                    "YtXNB-0cFBo",
                    "W7qWa52k-nE",
                    "yw3Cw5eG1wM",
                    "W7qWa52k-nE",
                  ].map((videoId, index) => (
                    <li key={index}>
                      <a
                        className="changeVideo"
                        data-yt-video={videoId}
                        href="#"
                      >
                        <div>
                          <span>september 10, 2015</span> consectetur
                          adipisicing elit :<span> Live audio and video</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="btn-down" href="#"></a>
              </div>

              <div className="video-show">
                <div
                  className="video-container"
                  id="video01"
                  data-current-video="W7qWa52k-nE"
                >
                  <iframe
                    src="https://www.youtube.com/embed/W7qWa52k-nE"
                    className="liveVideo"
                    allowFullScreen
                    title="Live Video"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const LatestNews = () => {
  return (
    <section className="latest_news bg-white">
      <div className="container">
        <div className="row">
          <h2 className="heading">
            latest <span>news</span>
          </h2>
          <p className="headParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
            debitis mollitia qui libero voluptate ratione, molestias!
            Necessitatibus voluptatem temporibus doloremque non, vel ipsam,
            nesciunt dolores consequatur, est tempora ut! Est Lorem ipsum dolor
            sit amet, consectetur adipisicing elit. Nihil debitis mollitia qui
            libero voluptate ratione, molestias! Necessitatibus voluptatem
            temporibus doloremque non, vel ipsam, nesciunt dolores consequatur,
            est tempora ut! Est.
          </p>

          <div className="LatestNews_wrap clearfix">
            <ul className="nav accordion-news" role="tablist">
              <li>
                <a
                  href="#world_news"
                  aria-controls="world_news"
                  role="tab"
                  data-toggle="tab"
                  id="world_news_button"
                >
                  world news
                </a>
              </li>
              <li className="active">
                <a
                  href="#club_news"
                  aria-controls="club_news"
                  role="tab"
                  data-toggle="tab"
                  id="club_news_button"
                >
                  club news
                </a>
              </li>
            </ul>
            <div className="tab-content news_display_container clearfix">
              <ul id="world_news" className="tab-pane">
                <li>
                  <div className="figure">
                    <div className="column-news">
                      <div className="figure-01">
                        <img src="images/news/w_news_01.jpg" alt="image" />
                      </div>
                      <div className="content-01">
                        <h6>
                          <a href="#">consectetur adipisicing elit</a>
                        </h6>
                        <p className="red_p">Stories of the legends</p>
                        <p className="describtion">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit.
                        </p>
                      </div>
                      <div className="news_date clearfix">
                        <span>october 14,2015</span>{" "}
                        <span className="like">
                          <a href="#">45</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* Repeat similar list items here */}
              </ul>

              <a className="prv club_prev"></a>
              <a className="nxt club_next"></a>

              <ul id="club_news" className="tab-pane active clearfix">
                <li>
                  <div className="figure">
                    <div className="column-news">
                      <div className="figure-01">
                        <img src="images/news/c_news_01.jpg" alt="image" />
                      </div>
                      <div className="content-01">
                        <h6>
                          <a href="#">consectetur adipisicing elit</a>
                        </h6>
                        <p className="red_p">Stories of the legends</p>
                        <p className="describtion">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit.
                        </p>
                      </div>
                      <div className="news_date clearfix">
                        <span>october 14,2015</span>{" "}
                        <span className="like">
                          <a href="#">45</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
                {/* Repeat similar list items here */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClubHistory = () => {
  return (
    <section className="club_history">
      <div className="container">
        <div className="row">
          <h2 className="heading">
            club <span>history</span>
          </h2>

          <p className="headParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis consequuntur animi, commodi, voluptatibus labore aperiam
            fugit maxime quos optio architecto cum? Laborum nesciunt doloribus
            expedita atque error rem molestias, ducimus.
          </p>

          <div className="nav clubHistory-wrap clearfix">
            <ul className="historyMeter">
              <li>
                <a href="#">
                  <span>1987</span>
                </a>
              </li>
              <li className="win">
                <a href="#win01">
                  <span>1988</span>
                </a>
              </li>
              {/* Add other years here */}
            </ul>
            <div className="tab-content historyVideoWrap clearfix">
              <div role="tabpanel" className="tab-pane clearfix" id="win01">
                <div className="historyVideo">
                  <div className="historyvideoContainer">
                    <iframe
                      src="https://www.youtube.com/embed/rPEd-h8DdRI"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                <div className="historyContent">
                  <h4>
                    <span>fifa 1988,</span> uefa champions league
                  </h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Numquam non voluptatibus error a esse maiores, ducimus sit
                    unde alias aspernatur perspiciatis itaque corporis?
                    Accusamus pariatur dolorum repellendus consectetur tempore
                    harum? Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Praesentium a modi atque reprehenderit eos, error
                    impedit voluptatum quo quaerat placeat accusantium molestiae
                    quod dolore, quae quos, blanditiis recusandae id iste? Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit.
                    Praesentium a modi atque reprehenderit.
                  </p>
                  <a
                    href="clubHistoryDetails.html"
                    className="btn-small btn-red"
                  >
                    Read more
                  </a>
                </div>
              </div>
              {/* Repeat for other video tabs */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsAndHistory = () => {
  return (
    <>
      <LatestNews />
      <ClubHistory />
    </>
  );
};

const PlayersSection = () => {
  return (
    <section className="players homeplayer">
      <div className="container">
        <div className="row">
          <h2 className="heading">
            Our <span>Heroes</span>
          </h2>
          <p className="headParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis consequuntur animi, commodi, voluptatibus labore aperiam
            fugit maxime quos optio architecto cum? Laborum nesciunt doloribus
            expedita atque error rem molestias, ducimus.
          </p>

          <div className="wrapplayer clearfix">
            <a className="prv prev-player" href="#"></a>
            <a className="nxt next-player" href="#"></a>
            <ul className="slideHeroes clearfix">
              {[
                {
                  name: "Daren Difiore",
                  role: "Goalkeeper",
                  age: 28,
                  image: player01,
                  loveCount: 20,
                },
                {
                  name: "Terry Tijerina",
                  role: "Defender",
                  age: 28,
                  image: player02,
                  loveCount: 34,
                },
                {
                  name: "Alex Alameda",
                  role: "Striker",
                  age: 28,
                  image: player03,
                  loveCount: 45,
                },
                {
                  name: "Lane Lavalley",
                  role: "Striker",
                  age: 28,
                  image: player04,
                  loveCount: 45,
                },
                {
                  name: "Dominick Dumbleton",
                  role: "Striker",
                  age: 28,
                  image: player05,
                  loveCount: 78,
                },
              ].map((player, index) => (
                <li key={index}>
                  <a href="#">
                    <div className="playerFig">
                      <div className="playerpic">
                        <div
                          style={{ background: `url(${player.image})` }}
                          className="bgimg"
                        ></div>
                      </div>
                      <ul className="playerDetails clearfix">
                        <li>
                          <span>{player.name}</span>
                          <span>
                            <img src={tShirtIcon} alt="shirt" />
                          </span>
                        </li>
                        <li className="playinfodetails">
                          Age {player.age} (born 22 April, 1987)
                        </li>
                        <li className="playerInfo">
                          <span>{player.role}</span>
                          <span>
                            <i className="fa fa-heart"></i>
                            {player.loveCount}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const GallerySection = () => {
  return (
    <section className="gallery">
      <div className="container">
        <div className="row">
          <h2 className="heading">
            Our <span>Gallery</span>
          </h2>
          <p className="headParagraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Perferendis consequuntur animi, commodi, voluptatibus labore aperiam
            fugit maxime quos optio architecto cum? Laborum nesciunt doloribus
            expedita atque error rem molestias, ducimus.
          </p>
        </div>
      </div>

      <div className="galleryWrapper">
        <div className="grid">
          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery01} alt="gallery-1" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery02} alt="gallery-2" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery03} alt="gallery-3" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery04} alt="gallery-4" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery021} alt="gallery-5" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery031} alt="gallery-6" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={five} alt="gallery-7" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery031} alt="gallery-8" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={"medium01"} alt="gallery-9" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={gallery041} alt="gallery-10" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid_item">
            <div className="gallery_dtl">
              <img src={"medium03"} alt="gallery-11" />
              <div className="gallery_info">
                <div className="galleryinfo_wrap">
                  <p className="uppercase">Consectetur</p>
                  <p className="red_p">Magna Aliqua</p>
                </div>
              </div>
            </div>
          </div>

          <div className="gutter"></div>
        </div>
      </div>

      <a className="btn btn-red" href="#">
        Read More
      </a>
    </section>
  );
};
