const num = 123456789;
const handle = num => String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
handle(num) // 123,456,789