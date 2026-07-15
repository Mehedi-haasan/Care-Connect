module.exports = (sequelize, Sequelize) => {
  const Video = sequelize.define("video", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    video_url: {
      type: Sequelize.STRING,
    },
    thumbnail_url: {
      type: Sequelize.STRING,
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Video;
};