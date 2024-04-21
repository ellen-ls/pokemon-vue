import { createI18n } from "vue-i18n";
import en from './en'
import pt from './pt'
import es from './es'

const messages = {
    en,
    pt,
    es
}

export default createI18n({
    locale:'en',
    messages
})