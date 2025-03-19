export const useChangeInputVisibility = (inputType: HTMLInputElement | null) => {
    if (!inputType) return

    const eyeSpan = inputType.nextElementSibling

    if (!eyeSpan) return

    const eyeIcon = eyeSpan.querySelector('img')

    if (!eyeIcon) return

    if (inputType.type === 'text') {
        eyeIcon.setAttribute('src', './src/assets/images/off-password.svg')
        inputType.type = 'password'
    } else {
        eyeIcon.setAttribute('src', './src/assets/images/on-password.svg')
        inputType.type = 'text'
    }
}