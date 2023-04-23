export function convertMovieId(apiId) {
  return apiId.split("/")[2];
}
export function getActorId(ActorData) {
  return ActorData.split("/")[2];
}
