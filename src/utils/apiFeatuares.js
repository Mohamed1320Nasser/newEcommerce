class ApiFeatures {
  constructor(mongooseQuery, querySting) {
    this.mongooseQuery = mongooseQuery;
    this.querySting = querySting;
  }
  paginat() {
    let page = this.querySting.page * 1 || 1;
    if (page < 1) page = 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    this.mongooseQuery.skip(skip).limit(limit);
    this.page = page;
    return this;
  }

  filter() {
    let queryString = { ...this.querySting };
    let excludeQuery = ["page", "sort", "keyword", "fields"];
    excludeQuery.forEach((ele) => {
      delete queryString[ele];
    });
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery.find(queryString);
    return this;
  }

  sort() {
    if (this.querySting.sort) {
      let sorted = this.querySting.sort.split(",").join(" ");
      this.mongooseQuery.sort(sorted);
    }
    return this;
  }
  search() {
    if (this.querySting.keyword) {
      let keword = this.querySting.keyword;
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: keword, $options: "i" } },
          { description: { $regex: keword, $options: "i" } },
        ],
      });
    }
    return this;
  }
  fields() {
    if (this.querySting.fields) {
      let fields = this.querySting.fields;
      fields = fields.split(",").join(" ");
      mongooseQuery.select(fields);``
    }
    return this;
  }
}
module.exports = ApiFeatures;
