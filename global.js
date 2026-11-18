// jsonを読み込んでHTMLに変換する

async function jsonLoader() {
    const memoJson = await fetch("data/memo.json"); // jsonを読み込む
    const memoList = await memoJson.json(); // 読み込んだjsonを配列に変える

    return memoList;
}

function memoRenderer(memoList) {
    for (const [category, item] of Object.entries(memoList)) { // jsonの配列からまずカテゴリを1つずつ取り出す
        const memoContainer = document.getElementById(category); // カテゴリと同じidがついたsectionを探す

        for (const memo of item) { // カテゴリからさらにメモを1件ずつ取り出す
            const memoItem = document.createElement("article"); // メモ1件を入れるarticleを作る
            memoItem.classList.add("memo_item");

            // articleの中に取り出したtitleとbodyをそれぞれ入れる
            memoItem.innerHTML = `
                <h3 class="memo_title">${memo.title}</h3>
                <div>${memo.body}</div>
            `

            memoContainer.append(memoItem); // メモが入ったarticleをHTMLに追加する
        }
    }
}

async function executor() {
    const memoList = await jsonLoader(); // 先にjsonを読み込む
    memoRenderer(memoList); // 読み込み終わったらメモを取り出してHTMLに挿入する作業をする
}

executor(); //　ページを開いたら上のコードを実行する



// カテゴリーボタンとページの表示

const categoryButtons = document.querySelectorAll(".category_button"); // カテゴリーボタン
const categoryPages = document.querySelectorAll(".memo_category"); // カテゴリー別ページ

categoryButtons.forEach(categoryButton => {
    categoryButton.addEventListener("click", () => { // ボタンをクリックした時
        categoryButtons.forEach(categoryButton => {
            categoryButton.classList.remove("selected"); // 全部のボタンから色を変えるclassを外す
        });
        categoryButton.classList.add("selected"); // クリックしたボタンだけ色を変える

        const selectedPage = document.getElementById(categoryButton.dataset.category); // ボタンのdataと同じidのページを取得する

        categoryPages.forEach(categoryPage => {
            categoryPage.classList.remove("selected"); // 全部のページを非表示にする
        });
        selectedPage.classList.add("selected"); // クリックしたページだけ色を変える

        localStorage.setItem("savedPage", categoryButton.dataset.category); // クリックしたページをローカルストレージに記憶する
    });
});

const buttoned = document.querySelector(`[data-category="${localStorage.getItem("savedPage")}"]`); //最後にクリックしたボタンを取得する
const Paged = document.getElementById(localStorage.getItem("savedPage")); // 最後にクリックしたページを取得する

buttoned.classList.add("selected"); // そのボタンだけを表示する
Paged.classList.add("selected"); // そのページだけを表示する