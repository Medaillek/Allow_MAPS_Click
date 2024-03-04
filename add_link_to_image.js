const url = window.location.href

if (url.startsWith('https://www.google.com/search')) {
    const allImages = Array.from(document.querySelectorAll('img'))
    allImages
        .filter((img) => img.src.includes('/maps/'))
        .forEach((img) => {
            img.style.cursor = 'pointer'
            const address = img
                .closest('.lu_map_section')
                ?.closest('.dirs')
                ?.parentElement?.querySelector('b')
                ?.textContent?.trim()

            img.addEventListener('click', (e) => {
                window.open(
                    `https://www.google.fr/maps/place/${address?.replace(/\s/gm, '+') ?? ''
                    }`,
                    '_blank'
                )
            })
        })
    const isACompanyAddress = Array.from(document.querySelectorAll('a')).find(a => a.href?.includes('/maps/'))

    if (isACompanyAddress) {
        const companyMap = document.querySelector('#lu_map')
        if (companyMap) {
            companyMap.style.cursor = 'pointer'
            companyMap.addEventListener('click', (e) => {
                window.open(
                    isACompanyAddress.href,
                    '_blank'
                )
            })

        }
    }
}