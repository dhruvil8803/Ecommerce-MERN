class ApiFeatures{
constructor(query, queryStr){
    this.query = query;
    this.queryStr = queryStr;
}
     search(){
    let key = this.queryStr.keyword ? {
     name: {
     $regex : this.queryStr.keyword,
     $options : "i"
    }
    } : {}
    this.query = this.query.find(key)
    return this;
}
 filter(){
    let key = {};
    key = this.queryStr.category ? {...key, category: this.queryStr.category} : key;
    if(this.queryStr.price){
        let price = {}
        price = this.queryStr.price.lte ? {...price, $lte : this.queryStr.price.lte} : price;
        price = this.queryStr.price.gte ? {...price, $gte : this.queryStr.price.gte} : price;
        key = {...key, price: price}
    }
    key = this.queryStr.rating ? {...key, rating: {$gte: this.queryStr.rating.gte}} : key;
    this.query = this.query.find(key);
    return this;
 }
  page(pageSize){
    let currentpage = Number(this.queryStr.page) || 1;
    let skip = (currentpage - 1) * pageSize;
    this.query = this.query.find().limit(pageSize).skip(skip);
    return this;
  }

}

module.exports =  ApiFeatures;