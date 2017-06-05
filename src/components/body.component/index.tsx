import * as React from "react";
import * as style from './style.css';
import {MOCKDATA_MEM} from "../../constants/actions";
import {MemoryInterface} from "../../interfaces/memory.interface";

namespace AppHeader {
    export interface Props {
      resetGame: boolean;
      clearedGame: any;
      scores: any;
      miss: any;
    }

    export interface State {
      cards: MemoryInterface[]
    }
}

export class BodyComponent extends React.Component<AppHeader.Props, AppHeader.State> {

  private MemSingleCard: MemoryInterface[];
  private storeCheckCard: MemoryInterface[] = [];
  private delay: boolean;
  private clearedGame: number = 0;
  private scores: number = 0;
  private miss: number = 0;

  constructor()
  {
    super();
    this.end()
  }

  componentWillReceiveProps()
  {
    this.end()
  }

  ShowMemoryPage(singleCard: MemoryInterface)
  {
    if(!this.delay) return;

    if(this.storeCheckCard.length >= 2) return;

    if(this.storeCheckCard.length < 2) {

      this.storeCheckCard.push(singleCard);
      this.MemSingleCard = this.state.cards.filter(f_card => f_card === singleCard).map(m_card => {
        m_card.showMemBool = true;
        return m_card;
      });

      let index = this.state.cards.indexOf(this.MemSingleCard[0]);
      this.state.cards[index] = this.MemSingleCard[0];

      this.setState({cards: this.state.cards});
    };

    this.storeCheckCard = this.storeCheckCard.filter((card, pos) => {
      return this.storeCheckCard.indexOf(card) == pos;
    });

    if(this.storeCheckCard.length > 1) this.resetTwo(singleCard);
  }

  private end()
  {
    this.delay = false;
    this.state = {cards: MOCKDATA_MEM};
    this.state.cards.map(data => { data.showMemBool = false; data.match = false;
      return data; });

    let that = this;

    setTimeout(function() {

      that.state.cards.map(data => { data.showMemBool = false; data.match = false;
        return data; });
      let shuffel = MOCKDATA_MEM;

      that.storeCheckCard = [];
      that.setState({cards: shuffel});
      that.delay = true;

    }, 500);
  }

  private resetTwo(singleCard)
  {
    setTimeout(() => {
      let resetCards = this.state.cards.map(card => {

        if(this.storeCheckCard[0] !== undefined)

          if(this.storeCheckCard[0].img ===  singleCard.img && singleCard.img === card.img) {
            this.scores ++;
            this.props.scores(this.scores);
            card.match = true;
          }

          card.showMemBool = false;

        return card;
      });

      if(this.storeCheckCard[0].img !==  singleCard.img) {
        this.miss --;
        this.props.miss(this.miss);
      }

      this.setState({cards: resetCards});

      if(this.state.cards.every(card => card.match)) {
        this.end();
        this.clearedGame++;
        this.props.clearedGame(this.clearedGame);
      };

        this.storeCheckCard = [];
    }, 1000);

  }

  private shuffleCards(array: any[])
  {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    return (
      <div ref="cards" className={style.body}>
        {this.state.cards.map((data: MemoryInterface, i) => <div key={i} className={style.wrapCard}>
          <div className={!data.match ?  style.fadeShow : style.fadeRemove}>
            <div
               className={data.showMemBool ? style.memCard+' '+style.card + ' ' + style.effect__click+' '+style.flipped : style.memCard+' '+style.card + ' ' + style.effect__click}
              >
                <div onClick={() => this.ShowMemoryPage(data)} className={style.card__front}>
                  <img src='./../../assets/questionmark.jpg' />
                </div>

                <div onClick={() => this.ShowMemoryPage(data)} className={ style.card__back }>
                  <img src={'./../../assets/'+data.img} />
                </div>
            </div>
          </div>
        </div>)}
      </div>
    );
  }
}
