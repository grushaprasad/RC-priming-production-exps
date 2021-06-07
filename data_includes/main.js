// PennController.Sequence( "instructions", randomize("practice_trial1"), "start_exp1", randomize("without_precursor"), "end_part1", randomize("practice_trial2"), "start_exp2", randomize("with_precursor"), "demographic", "send_results", "exp_end");

PennController.Sequence("consent", "instructions", "experiment", "demographic", "participant_obs", "send_results", "exp_end");

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



PennController.Template(row => PennController( "experiment" ,
    
    newText("Prime", row.prime)
        .settings.center()
        .print()
    ,

    newVar("RT_prime").global().set( v_prime => Date.now())
    ,
    
    newButton("prime", "Continue")
        .settings.center()
        .settings.log()
        .print()
        .wait()
        .remove()
    ,

    getVar("RT_prime").set( v_prime => Date.now() - v_prime )
    ,

    getText("Prime")
        .remove()
    ,

    newVar("RT_target").global().set( v_target => Date.now())
    ,

    newText("Target", row.target)
        .settings.center()
        .print()
    ,
        
    newButton("target", "Continue")
        .settings.center()
        .settings.log()
        .print()
        .wait()
        .remove()
    ,

    getVar("RT_target").set( v_target => Date.now() - v_target )
    ,

    getText("Target")
        .remove()
    ,

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

    newVar("RT_resp").global().set(v_resp => Date.now())
    ,

    newText("Question", row.question)
        .settings.center()
        .print()
    ,

    newScale("response",   "Yes", "No")
        .settings.log()
        .settings.labelsPosition("top")  // Position the labels
        .settings.center()
        .print()
        .wait()
    ,

    getVar("RT_resp").set( v_resp => Date.now() - v_resp )
    ,

    getText("Question")
        .remove()

    ,

    getScale("response")
        .remove()
    ,


    newTimer("ITI", 1000)
        .start()
        .wait()
    )

    .log("prime_type", row.prime_type)
    .log("target_type", row.target_type)
    .log("prime_id", row.prime_id)
    .log("target_id", row.target_id)
    .log("answer", row.answer)
    .log("ques_ind", row.ques_ind)
    .log("group", row.Group)
    .log("RT_prime", getVar("RT_prime"))
    .log("RT_target", getVar("RT_target"))
    .log("RT_resp", getVar("RT_resp"))
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

PennController.DebugOff()






