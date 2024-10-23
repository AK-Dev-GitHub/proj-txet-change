// X APIのBearer Token（仮置き）
const BEARER_TOKEN = 'YOUR_BEARER_TOKEN_HERE';

// XのAPIエンドポイント（検索用）
const SEARCH_URL = 'https://api.twitter.com/2/tweets/search/recent';

// 特定のURLを含むツイートを検索
const urlPattern = /https:\/\/example\.com/; // 検索したいURLのパターン
const maxPosts = 10; // 最大表示件数
const postList = document.getElementById('postList');

// APIを使ってツイートを取得
async function fetchTweets() {
  try {
    const response = await fetch(
      `${SEARCH_URL}?query=https://example.com&tweet.fields=created_at`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const tweets = data.data;

    displayTweets(tweets);
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
}

// ツイートを表示
function displayTweets(tweets) {
  // URLを含むツイートをフィルタリング
  const filteredTweets = tweets.filter((tweet) => urlPattern.test(tweet.text));

  // 最大10件まで表示
  const postsToShow = filteredTweets.slice(-maxPosts);

  // ポストを表示
  postList.innerHTML = ''; // 一度リストをクリア
  postsToShow.forEach((tweet) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `<p>${tweet.text}</p><small>${tweet.created_at}</small>`;
    postList.appendChild(postElement);
  });

  // スクロールを快適にする
  postList.scrollTop = postList.scrollHeight;
}

// 初回のデータ取得
fetchTweets();

// 例えば60秒ごとに新しいデータを取得
setInterval(fetchTweets, 60000); // 60秒ごとにAPIを呼び出し
