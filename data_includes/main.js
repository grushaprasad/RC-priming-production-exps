// PennController.Sequence( "instructions", randomize("practice_trial1"), "start_exp1", randomize("without_precursor"), "end_part1", randomize("practice_trial2"), "start_exp2", randomize("with_precursor"), "demographic", "send_results", "exp_end");

PennController.Sequence("consent", "instructions", "demographic", "experiment", "participant_obs", "send_results", "exp_end");

PennController.ResetPrefix(null);

//PennController.PreloadZip("https://consonant-perception-exp1.s3.us-east-2.amazonaws.com/mp3_test.zip");


PennController("consent",

    newHtml("consent", "consent.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("consent").test.complete()
                .failure( getHtml("consent").warn() )
        )
);


PennController("instructions",

    newHtml("instructions", "instructions.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Start experiment")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("instructions").test.complete()
                .failure( getHtml("instructions").warn() )
        )
);


PennController("demographic",

    newHtml("demographics", "demographic.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Continue")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("demographics").test.complete()
                .failure( getHtml("demographics").warn() )
        )
);



PennController.Template(row => PennController( "experiment" ,
    
    newText("prompt", row.sentence)
        .settings.center()
        .print()
    ,

    newVar("RT").global().set(v_rt => Date.now())
    ,
    
    newTextInput("response")
      .print()
      .wait()
      .settings.log("final")
    ,


    newButton("continue", "Next prompt")
        .settings.center()
        .settings.log()
        .print()
        .wait(getTextInput("response").test.text(row.sentence/\w+/))
        .remove()
    ,

    getVar("RT").set( v_rt => Date.now() - v_rt )
    ,
    
    getText("prompt")
        .remove()
    ,

    getTextInput("response")
        .remove()


    newText("transition", " ")
        .settings.center()
        .print()
    ,

    newTimer("ITI", 1000)
        .start()
        .wait()
    ,

    getText("transition")
        .remove()
    ,

    .log("sent_type", row.sent_type)
    .log("struc", row.struc)
    .log("prime_type", row.prime_type)
    .log("verb", row.verb)
    .log("verb_num", row.verb_num)
    .log("sent_id", row.sent_id)
    .log("sentence", row.sentence)
    .log("RT", getVar("RT"))
    .log("RT_target", getVar("RT_target"))
    .log("RT_resp", getVar("RT_resp"))
);


PennController("participant_obs",

    newHtml("participant_obervations", "participant_observations.html")
        .settings.log()
        .print()
    ,

    newButton("continue", "Finish experiment")
        .settings.css("font-size", "larger")
        .print()
        .wait(
            getHtml("participant_obervations").test.complete()
                .failure( getHtml("participant_obervations").warn() )
        )
);

PennController.SendResults("send_results");

PennController("exp_end", 
    newText("end", "Thank you for participating in this experiment. Your survey code is TyhRSx3k7")
        .print()
    ,

    newTimer("forever", 1)
        .wait()            // Timer never started: will wait forever
)

//PennController.DebugOff()






