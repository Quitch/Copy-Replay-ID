var copyReplayIDButtonLoaded;

function copyReplayIDButton() {
  if (copyReplayIDButtonLoaded) {
    return;
  }

  copyReplayIDButtonLoaded = true;

  try {
    model.gameId = ko.observable("");

    $(".section_controls").append(
      loadHtml(
        "coui://ui/mods/com.pa.quitch.copy-replay-id/replay_browser/lobby_id.html"
      )
    );

    var formattedId = function () {
      var selectedGame = model.currentSelectedGame();
      var replayId = selectedGame.host_id;
      var requiredContent = selectedGame.required_content
        ? selectedGame.required_content + ":"
        : "";
      return requiredContent + replayId;
    };

    model.currentSelectedGame.subscribe(function () {
      if (!model.canViewReplay() || !model.currentSelectedGame()) {
        return;
      }

      model.gameId(formattedId());
    });
  } catch (e) {
    console.error(e);
    console.error(JSON.stringify(e));
  }
}
copyReplayIDButton();
