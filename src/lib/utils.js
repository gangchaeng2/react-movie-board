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
    if(gubun === 'movieDetail') {
        return d_day;
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
        return `개봉 ${(d_day + 1) * -1}일 전`;
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

export function getStillCutList(media) {
    let list = [];

    if(!isEmpty(media)) {
        list = media.filter(function(item){
            return item.type === 'stillcut';
        });
    }
    return list;
}
