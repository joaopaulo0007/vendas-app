function converter(value: string): string {
    if (!value) {
        return '0'
    }
    return (value.replace('.', '').replace(',', '.'))
}

export {converter}

