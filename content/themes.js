themeRandomizer = () => {
    const plainThemes = ["pastel", "griffith", "guts", "stairs"]
    const otherTheme = ["aries", "cow"]

    const theme = plainThemes;

    const now = new Date()
    const check = new Date();
    check.setHours(21,0, 0, 0);
    if(now > check) {
        theme.push(otherTheme);
    }

    const random = theme[Math.floor(Math.random() * theme.length)]
    return random
}
    
setTheme = () => {
    const selector = document.getElementsByClassName("image")[0]
    savedTheme = localStorage.getItem('theme')
    if(savedTheme) {
        document.documentElement.className = savedTheme
    }
    
    selector.addEventListener("click", () => {
        theme = themeRandomizer()
        document.documentElement.className = theme
        localStorage.setItem('theme', theme)
    })
}
    
setTheme()