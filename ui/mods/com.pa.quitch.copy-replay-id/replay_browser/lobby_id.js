var copyReplayIDButtonLoaded;

if (!copyReplayIDButtonLoaded) {
  copyReplayIDButtonLoaded = true;

  function copyReplayIDButton() {
    try {
      model.gameId = ko.observable("");

      $(".section_controls").append(
        loadHtml(
          "coui://ui/mods/com.pa.quitch.copy-replay-id/replay_browser/lobby_id.html"
        )
      );

      var formattedId = function () {
        if (!model.canViewReplay()) {
          return "";
        }

        var currentSelectedGame = model.currentSelectedGame();
        var replayId = currentSelectedGame.host_id;
        var requiredContent = currentSelectedGame.required_content
          ? currentSelectedGame.required_content + ":"
          : "";
        return requiredContent + replayId;
      };

      model.currentSelectedGame.subscribe(function () {
        model.gameId(formattedId());
      });
    } catch (e) {
      console.error(e);
      console.error(JSON.stringify(e));
    }
  }
  copyReplayIDButton();
}
