exports.status = (req, res) => {
  return res.status(200).json({
    code: 200,
    Status: "Good!",
    reqData: req.body,
  });
};

// {
//   iss: 'https://accounts.google.com',
//   azp: '273165941736-ks9r28b7vecnmkc5n2ht3kcoesl76ppj.apps.googleusercontent.com',
//   aud: '273165941736-ks9r28b7vecnmkc5n2ht3kcoesl76ppj.apps.googleusercontent.com',
//   sub: '117196729982985375994',
//   email: 'iamakbarsha1@gmail.com',
//   email_verified: true,
//   nbf: 1713034044,
//   name: 'Akbar Sha S',
//   picture: 'https://lh3.googleusercontent.com/a/ACg8ocI9rVwcsWrMWEwgFZeXN-HnjP6aWiQqyhp3Uzw3QweuYTSyTyo=s96-c',
//   given_name: 'Akbar Sha',
//   family_name: 'S',
//   iat: 1713034344,
//   exp: 1713037944,
//   jti: '956b566443d37e48dffa487e14f87f627a7998a1'
// }
