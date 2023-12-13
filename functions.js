document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav")
  let navHeight = 0

  const adjustNav = () => {
    navHeight = nav.clientHeight
    const isHeader = window.location.hash.substring(1) === "header"

    if (window.scrollY > navHeight && !isHeader) {
      nav.classList.add("fixed")
      nav.classList.remove("hidden")
    } else {
      nav.classList.remove("fixed")
      nav.classList.add("hidden")
    }

    // 현재 보이는 섹션에 해당하는 링크에 active 클래스 추가
    const sections = document.querySelectorAll("section")
    let found = false

    sections.forEach((section) => {
      const top = section.offsetTop
      const height = section.clientHeight

      if (window.scrollY >= top && window.scrollY < top + height && !found) {
        const dest = section.getAttribute("id")
        const activeLink = document.querySelector(`.page-link[dest="${dest}"]`)
        if (activeLink) {
          document
            .querySelectorAll(".page-link")
            .forEach((link) => link.classList.remove("active"))
          activeLink.classList.add("active")
          found = true
        }
      }

      // 추가된 부분: 각 섹션에서 스크롤 시 해당 섹션의 링크에 강조 효과 추가
      section.addEventListener("scroll", () => {
        const dest = section.getAttribute("id")
        const activeLink = document.querySelector(`.page-link[dest="${dest}"]`)
        if (activeLink && isElementInViewport(section)) {
          document
            .querySelectorAll(".page-link")
            .forEach((link) => link.classList.remove("active"))
          activeLink.classList.add("active")
        }
      })
    })
  }

  nav.classList.add("hidden")

  adjustNav()

  const links = document.querySelectorAll(".page-link")

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((link) => link.classList.remove("active"))

      let destination

      if (link.getAttribute("dest") === "home") {
        destination = document.getElementById("header")
      } else {
        destination = document.getElementById(link.getAttribute("dest"))
      }

      destination.scrollIntoView({ behavior: "smooth" })

      link.classList.add("active")

      if (destination.id === "header") {
        nav.classList.remove("fixed")
      }
    })
  })

  const aboutMeLink = document.getElementById("button")
  const aboutNavLink = document.querySelector('.page-link[dest="about"]')

  aboutMeLink.addEventListener("click", (event) => {
    event.preventDefault()

    links.forEach((link) => link.classList.remove("active"))

    const destination = document.getElementById("about")
    destination.scrollIntoView({ behavior: "smooth" })

    aboutMeLink.classList.add("active")
    aboutNavLink.classList.add("active")

    if (destination.id === "header") {
      nav.classList.remove("fixed")
    }
  })

  window.addEventListener("scroll", () => {
    adjustNav()
    // 스크롤 시 해당 섹션의 링크에 강조 효과 추가
    sections.forEach((section) => {
      const dest = section.getAttribute("id")
      const activeLink = document.querySelector(`.page-link[dest="${dest}"]`)
      if (activeLink && isElementInViewport(section)) {
        document
          .querySelectorAll(".page-link")
          .forEach((link) => link.classList.remove("active"))
        activeLink.classList.add("active")
      }
    })
  })

  // 추가된 부분: 각 섹션에서 스크롤 시 해당 섹션의 링크에 강조 효과 추가
  const sections = document.querySelectorAll("section")

  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  sections.forEach((section) => {
    section.addEventListener("scroll", () => {
      const dest = section.getAttribute("id")
      const activeLink = document.querySelector(`.page-link[dest="${dest}"]`)
      if (activeLink) {
        document
          .querySelectorAll(".page-link")
          .forEach((link) => link.classList.remove("active"))
        activeLink.classList.add("active")
      }
    })
  })

  const projectCarousel = document.getElementById("projectCarousel")
  const prevArrow = document.querySelector(".prev-arrow")
  const nextArrow = document.querySelector(".next-arrow")
  const slides = document.querySelectorAll(".slide")
  let counter = 0

  prevArrow.addEventListener("click", () => {
    if (counter > 0) {
      slides[counter].classList.remove("active")
      counter--
    } else {
      slides[counter].classList.remove("active")
      counter = slides.length - 1
    }
    slides[counter].classList.add("active")
    updateCarousel()
  })

  nextArrow.addEventListener("click", () => {
    if (counter < slides.length - 1) {
      slides[counter].classList.remove("active")
      counter++
    } else {
      slides[counter].classList.remove("active")
      counter = 0
    }
    slides[counter].classList.add("active")
    updateCarousel()
  })

  function updateCarousel() {
    const translateXValue = -counter * 100 + "%"
    projectCarousel.style.transform = `translateX(${translateXValue})`
  }

  updateCarousel() // added to display first image correctly
})
