module.exports = {
    format_date: date => {
      return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
       return (amount !==1 ? `${word}s`: word);
    },
    format_url: url => {
        return url
            .replace('http://', '')
            .replace('http://', '')
            .replace('www.', '')
            .split('/')[0]
            .split('?')[0]
    }
}