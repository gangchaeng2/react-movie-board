// 빈 객체인지 확인
export function isEmpty(value) {
    if( value === "" || value === null || value === undefined || ( value !== null && typeof value === "object" && !Object.keys(value).length ) ) {
        return true
    } else {
      return false
    }
}

// 개봉일
export function getOpenDate(d_day, gubun) {
    if(gubun === 'simillarMoive') {
        return d_day+'년';
    } else {
      const today = new Date();
      today.setDate(today.getDate() - d_day);
      let year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();

      return `${year}년 ${month}월 ${day}일`;
    }
}

// 오늘 기준 개봉일
export function getRelaseInfo(d_day) {
    if(d_day < 0) {
        return `개봉 ${d_day * -1}일 전`;
    } else {
        return `개봉 ${d_day + 1}일 째`;
    }
}

// 누적관객수
export function getAudience(audience) {
    return Number(audience).toLocaleString('en');
}

// 출연정보 리스트
export function getPeopleList(peoples) {
    let peopleInfo = '';

    if(!isEmpty(peoples) || peoples !== undefined) {
        peoples.map((people, i) => {
            if(i === 0) {
                peopleInfo += `${people.name}`;
            } else {
                peopleInfo += `, ${people.name}`;
            }
        });
    }

    return peopleInfo;
}

// meida 정보에서 stillcut만 로드
export function getStillCutList(media) {
    let list = [];

    if(!isEmpty(media)) {
        list = media.filter(function(item){
            return item.type === 'stillcut';
        });
    }
    return list;
}

// comment, stroy 자르기
export function cutStory(story, gubun) {
    let cutStroy = '';
    let cutSize = 300;

    if(gubun === 'comment') {
        cutSize = 200;
        if(!isEmpty(story)) {
            if(story.text.length > cutSize) {
                cutStroy = story.text.substr(0, cutSize)+'...';
            } else {
                cutStroy = story.text;
            }
        } else {
            cutStroy = '게시된 리뷰가 없습니다.';
        }
    } else {
        if(!isEmpty(story)) {
            if(story.length > cutSize) {
                cutStroy = story.substr(0, cutSize)+'...';
            } else {
                cutStroy = story;
            }
        } else {
            cutStroy = '게시된 리뷰가 없습니다.';
        }
    }

    return cutStroy;
}

// 별 개수
export function getRating(rating) {
    let newRating = '';

    switch(Math.floor(rating)) {
        case 1:
          newRating = '★';
          break;
        case 2:
          newRating = '★★';
          break;
        case 3:
          newRating = '★★★';
          break;
        case 4:
          newRating = '★★★★';
          break;
        case 5:
          newRating = '★★★★★';
          break;
        default:
          newRating = '★★★';
          break;
      }

      return newRating;
}

// 예매율 반올림
export function getReservation(reservation) {
    let newReservation = 0;

    if(!isEmpty(reservation)) {
        newReservation = reservation.toFixed(2);
    }

    return newReservation;
}
