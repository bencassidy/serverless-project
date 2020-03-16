const AWS = require("aws-sdk");
const { chunk } = require("lodash");

const ddb = new AWS.DynamoDB();
const s3 = new AWS.S3();

module.exports.process = async event => {
  async function getEpisodeList() {
    const file = await s3.getObject({
      Bucket: "vf-sls-data",
      Key: "episodeList-1.json"
    }).promise();

    return JSON.parse(file.Body);
  }

  function formatData(list) {
    return {
      RequestItems: {
        episodes: list.map(episodeObj => {
          return {
            PutRequest: {
              Item: {
                EpisodeId: {
                  S: `${episodeObj.season}-${episodeObj.episode}`
                },
                EpisodeTitle: {
                  S: episodeObj.title
                },
                Synopsis: {
                  S: episodeObj.synopsis
                },
                Images: {
                  SS: episodeObj.images
                }
              }
            }
          }
        })
      }
    };
  }

  try {
    const episodeList = await getEpisodeList();
    const episodeListChunk = chunk(episodeList, 25);
    const formattedChunkList = episodeListChunk.map(chunk => formatData(chunk));

    const response = await Promise.all(formattedChunkList.map(chunk => ddb.batchWriteItem(chunk).promise()));

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "DynamoResponse: " + response,
          input: event,
        },
        null,
        2
      ),
    };

  } catch (e) {
    return {
      statusCode: e.code,
      body: JSON.stringify(
        {
          message: e.message,
          input: event,
        },
        null,
        2
      ),
    }
  }
};
