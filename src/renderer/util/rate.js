export const isTransform = (rate) => {

    const result = Math.random();
    if(result >= rate) return false;
    else return true;
}
