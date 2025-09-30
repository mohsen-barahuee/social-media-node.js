const $ = document;

const tabs = [
  {
    id: 1,
    title: "Posts",
    items: [
      {
        cover: "/public/images/feed-3.jpg",
        caption:
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque mollitia deleniti cum similique unde atque sapiente! 💖🙌",
      },
      
    ],
  },
  {
    id: 2,
    title: "Reels",
    items: [
      { cover: "/public/images/feed-1.jpg" },
      { cover: "/public/images/feed-2.jpg" },
      { cover: "/public/images/feed-3.jpg" },
      { cover: "/public/images/feed-4.jpg" },
      { cover: "/public/images/feed-5.jpg" },
      { cover: "/public/images/feed-6.jpg" },
    ],
  },
  {
    id: 3,
    title: "Pictures",
    items: [],
  },
  {
    id: 4,
    title: "Reposts",
    items: [],
  },
];

let currentTab = "Posts";

// Elements
const buttonsContainer = $.querySelector("#buttons-container");
const feedsContainer = $.querySelector("#feeds-container");

// Modal
const modal = $.querySelector("#modal-card");
const modalScreen = $.querySelector("#modal");

const followingsButton = $.querySelector("#followings");
const closeButton = $.querySelector("#close-button");

const sendVerificationButton = $.querySelector(".send-verification");

modal.addEventListener("click", (event) => {
  event.stopPropagation();
});

followingsButton.addEventListener("click", () => {
  modalScreen.classList.contains("visible")
    ? modalScreen.classList.remove("visible")
    : modalScreen.classList.add("visible");

  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
        Following
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

    </button>
</header>
<main class="mt-2">
    <article class="following-card ">
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img src="/public/images/feed-3.jpg" class="w-full object-cover h-full" alt="">
                </div>
                <div>
                    <h6 class="">
                        Elisabet Jackson
                    </h6>
                    <p class="text-sm font-Poppins-Light text-gray-600">
                        @elisabet
                    </p>
                </div>
            </div>
        </div>
        <div>
            <button class="follow-button text-xs">
                Follow
            </button>
        </div>
    </article>
    <article class="following-card ">
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img src="/public/images/profile-18.jpg" class="w-full object-cover h-full" alt="">
                </div>
                <div>
                    <h6 class="">
                        Noah Taylor
                    </h6>
                    <p class="text-sm font-Poppins-Light text-gray-600">
                        @noah_gamer
                    </p>
                </div>
            </div>
        </div>
        <div>
            <button class="follow-button text-xs">
                Follow
            </button>
        </div>
    </article>
    <article class="following-card ">
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img src="/public/images/profile-6.jpg" class="w-full object-cover h-full" alt="">
                </div>
                <div>
                    <h6 class="">
                        Hannah Smith
                    </h6>
                    <p class="text-sm font-Poppins-Light text-gray-600">
                        @mrs.smith
                    </p>
                </div>
            </div>
        </div>
        <div>
            <button class="follow-button text-xs">
                Follow
            </button>
        </div>
    </article>
    <article class="following-card ">
        <div class="flex items-center gap-1">
            <div class="flex items-center gap-2">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                    <img src="/public/images/profile-1.jpg" class="w-full object-cover h-full" alt="">
                </div>
                <div>
                    <h6 class="">
                        Lena Mc'Queen
                    </h6>
                    <p class="text-sm font-Poppins-Light text-gray-600">
                        @the_lena
                    </p>
                </div>
            </div>
        </div>
        <div>
            <button class="follow-button text-xs">
                Follow
            </button>
        </div>
    </article>
</main>`
  );
});

const modalCloseHandler = () => {
  modalScreen.classList.remove("visible");
};
const modalOpenHandler = () => {
  modalScreen.classList.add("visible");
};

sendVerificationButton.addEventListener("click", (event) => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
        Verify Email
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
<p class="font-Poppins-SemiBold text-sm">
 Email address <span class="requre-symbol">*</span>
</p>
<input type="email" placeholder="example@yahoo.com" class="email-input"/>
</main>
<footer class="mt-2">
<button onclick="codeSentHandler()" id="send-verify-code">
Send verification
</button>
</footer>

`
  );
});

const codeSentHandler = (event) => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Enter the code
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
<div class="alert success">
<span>
Code sent successfully !
</span>
</div>
<p class="font-Poppins-SemiBold text-sm">
 Verification code <span class="requre-symbol">*</span>
</p>
<input type="email" placeholder="*****" class="email-input text-center"/>
</main>
<footer class="mt-2">
<button onclick="verifyCodeHandler()" id="send-verify-code">
VERIFY
</button>
</footer>
`
  );
};

const redirector = () => {
  console.log("hi");
  window.location.reload();
};

const successfullyVerification = () => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Successful
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
    <div class="alert success" > Verification was successfully ! </div>
</main>
<footer class="mt-2">
<button onclick="redirector()"  id="send-verify-code">
CONTINUE
</button>
</footer>
`
  );
};

const failureVerification = () => {
  modalOpenHandler();
  modal.innerHTML = "";
  modal.insertAdjacentHTML(
    "afterbegin",
    `
    <header id="modal-header" class="w-full pb-4 flex items-center justify-between">
    <div></div>
    <div class="pl-5">
    Failed
    </div>
    <button onclick="modalCloseHandler()" id="close-button" class="max-w-max flex-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    </button>
</header>
<main class="px-4 my-2 border-b">
    <div class="alert error" > Verification was failure ! </div>
</main>
<footer class="mt-2">
<button onclick="redirector()"   id="send-verify-code">
CONTINUE
</button>
</footer>
`
  );
};

const verifyCodeHandler = (OTP) => {
  if (OTP) {
    successfullyVerification();
  } else {
    failureVerification();
  }
};

modalScreen.addEventListener("click", (event) => {
  modalCloseHandler();
});

document.onkeydown = (event) => {
  const { keyCode } = event;
  keyCode === 27 && modalScreen.classList.remove("visible");
};

const tabsFunc = () => {
  buttonsContainer.innerHTML = "";
  
  tabs.forEach((element) => {
    buttonsContainer.insertAdjacentHTML(
      "beforeend",
      `<button onclick="changePage('${element.title
      }')" class='profile-feed__button ${currentTab === element.title ? "isActive" : ""
      }'>
        ${element.title}
    </button>`
    );

  
  });

};

tabsFunc();

const changePage = (title) => {
  currentTab = title;
  tabsFunc();
};
