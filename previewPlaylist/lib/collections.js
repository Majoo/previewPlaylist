Auths = new Mongo.Collection('auths',
  {capped: true, size: 1});

Auths.needsAuth = function() {
  return !Auths.find();
}
