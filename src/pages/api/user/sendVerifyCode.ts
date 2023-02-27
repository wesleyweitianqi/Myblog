export default async (req, res) => {
  const { to="", templateId ="1"} = req.body;
  console.log(to, templateId)
  res.status(200).json({code:0, data:123})
} 