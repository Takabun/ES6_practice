//150円のりんごを１つ買う関数
//第一引数に支払い金額
//第二引数にコールバック関数
//おつりを計算してコールバック関数に渡す
var asyncBuyApple = function(payment, callback){
    setTimeout(function(){
      if(payment >= 150){
        callback(payment-150, null);
      }else{
        callback(null, '金額が足りません。');
      }
    }, 1000);
}

//りんごをひとつだけ買う場合
asyncBuyApple(500, function(change, error){
    if(change !== null){
      console.log('おつりは' + change + '円です。');
    }
    if(error !== null){
      console.log('エラーが発生しました：' + error);
    }
});
console.log('500円払いました。');


//りんごをたくさん買う場合（コールバックバージョン）
asyncBuyApple(500, function(change, error){
    if(change !== null){
      console.log('１回目のおつりは' + change + '円です。');
      asyncBuyApple(change, function(change, error){
        if(change !== null){
          console.log('２回目のおつりは' + change + '円です。');
 
          asyncBuyApple(change, function(change, error){
            if(change !== null){
              console.log('３回目のおつりは' + change + '円です。');
            }
            if(error !== null){
              console.log('３回目でエラーが発生しました：' + error);
            }
          });
        }
        if(error !== null){
          console.log('２回目でエラーが発生しました：' + error);
        }
      });
    }
    if(error !== null){
      console.log('１回目でエラーが発生しました：' + error);
    }
});

//resolveとrejectがきも
var promiseBuyApple = function(payment){
    return new Promise(function(resolve, reject){
      if(payment >= 150){
        resolve(payment-150);
      }else{
        reject('金額が足りません。');
      }
    });
}

//りんごをひとつ買う
promiseBuyApple(400).then(function(change){
    console.log('おつりは' + change + '円です');
  }).catch(function(error){
    console.log('エラーが発生しました：' + error);
});

//りんごをたくさん買う (Promise非同期版)
//thenとcatchがきも
promiseBuyApple(400).then(function(change){
    console.log('おつりは' + change + '円です');
    return promiseBuyApple(change);
  }).then(function(change){
    console.log('おつりは' + change + '円です');
    return promiseBuyApple(change);
  }).then(function(change){
    console.log('おつりは' + change + '円です');
  }).catch(function(error){
    console.log('エラーが発生しました：' + error);
});





const data = [
  { name: 'Taro', age: 20 },
  { name: 'Hanako', age: 25 },
  { name: 'Tom', age: 30 }
];

/* こういう形にしたい { Taro: 20, Hanako: 25, Tom: 30 } */
const result = data.reduce((prev, current) => {
  console.log("prev", prev)
  console.log("current", current)
  prev[current.name] = current.age; // :とするとエラー
  return prev;
}, {});

console.log(result); 