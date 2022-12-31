const { Index, Document, Worker } = require("flexsearch");
import Collapse from '../../node_modules/bootstrap/js/dist/collapse';

// Code largly copied from Doks https://github.com/h-enk/doks

var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});


(function(){

  var index = new Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: 'id',
      store: [
        "href", "name", "description"
      ],
      index: ["name", "description"]
    },
    language: "en"
  });

  var i = 0;
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.Accenter/",
        name: "Accenter",
        description: "Automatically create accents for lines",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.Autowrapper/",
        name: "Autowrapper",
        description: "Automatically set/unset \\q2 on lines with/without manual linebreaks",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.ClipSize/",
        name: "Clip Size",
        description: "Measures distances in a vectorial clip",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.CombineGradientLines/",
        name: "Combine Gradient Lines",
        description: "Combines identical rect-clip gradient lines",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.EncodeClip/",
        name: "Encode Clip",
        description: "Encode a hardsubbed clip encompassing the current selection",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.ExtrapolateMove/",
        name: "Extrapolate Move",
        description: "Extrapolates a \\move tag to the line's full duration",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.JumpToNextPlus/",
        name: "Jump to Next++",
        description: "Jumps to next 'sign' in the subtitle grid",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.Phantom/",
        name: "Phantom",
        description: "Align line content to match others by adding text and abusing transparency",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.PosToMargin/",
        name: "Margin Position",
        description: "Transforms \\pos-based positioning into margin and vice versa",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.Snapper/",
        name: "Snapper",
        description: "Snaps line start and end times to keyframes",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.SplitTimer/",
        name: "SplitTimer",
        description: "Split lines in selection to shorter segments",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/petzku.Typewriter/",
        name: "Typewriter",
        description: "Makes text appear one character at a time",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.wave/",
        name: "Wave",
        description: "Make the string wavy",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.wobble/",
        name: "Wobble",
        description: "Converts a text to a shape and adds wobbling",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.snap/",
        name: "Bidirectional Snapping",
        description: "Snap to close keyframes during timing",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.svg2ass/",
        name: "svg2ass",
        description: "Script that uses svg2ass to convert svg files to ass lines",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.changeAlignment/",
        name: "Change Alignment",
        description: "Change alignment of line without changing it's appearance.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/phos.AddGrain/",
        name: "Add Grain",
        description: "Add static and dynamic grain",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/a-mo.Aegisub-Motion/",
        name: "Aegisub-Motion",
        description: "The main macro.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.AegisubChain/",
        name: "AegisubChain",
        description: "Compose chains out of existing automation macros, and play them back as non-GUI macros, or using only one dialog.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.Resample/",
        name: "Resample Perspective",
        description: "Apply after resampling a script in Aegisub to fix any lines with 3D rotations.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.FocusLines/",
        name: "Focus Lines",
        description: "Draws moving focus lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.RWTools/",
        name: "Rewriting Tools",
        description: "Shortcuts for managing multiple rewrites of a line in one .ass event line.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.NoteBrowser/",
        name: "Note Browser",
        description: "Loads a set of timestamped notes and adds options to mark them or jump between them.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.GitSigns/",
        name: "Git Signs",
        description: "Displays git diffs in Aegisub",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/arch.ConvertFolds/",
        name: "Convert Folds",
        description: "Convert folds stored in the project properties to extradata folds.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/Flux.DialogSwapper/",
        name: "Dialog Swapper",
        description: "Perform text swapping operations on a script",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/Flux.TitleCase/",
        name: "Title Case",
        description: "Applies English Title Case to selected lines",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/Flux.Selegator/",
        name: "Selegator",
        description: "Select/navigate in the subtitle grid",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/Flux.JumpScroll/",
        name: "JumpScroll",
        description: "Save and load subtitle grid scrollbar positions on Windows",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/Flux.ScaleRotTags/",
        name: "Scale Rotation Tags (Incorrectly)",
        description: "Adjust frx/fry in lines post-upsample to be less terrible, though still wrong",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.DependencyControl.Toolbox/",
        name: "DependencyControl Toolbox",
        description: "Provides DependencyControl maintenance and configuration utilities.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.ASSWipe/",
        name: "ASSWipe",
        description: "Performs script cleanup, removes unnecessary tags and lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.CascadeTransforms/",
        name: "Cascade Transforms",
        description: "Changes transforms in a line to be transformed in a consecutive fashion, with the transform time being split evenly.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.HighlightSubstring/",
        name: "Highlight Substring",
        description: "Highlights a substring at a given index in a line by underlaying a colored rectangle.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.InsertLineBreaks/",
        name: "Insert Line Breaks",
        description: "Inserts hard line breaks after n characters, but tries to avoid breaking up words.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.LerpByChar/",
        name: "Lerp By Character",
        description: "Linearly interpolates a specified override tag character-by-character between stops in a line.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.MergeDrawings/",
        name: "Merge Drawings",
        description: "Moves all drawings found in all selected lines into the first line. Maintains positioning and converts scale as well as alignment.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.MoveAlongPath/",
        name: "Move Along Path",
        description: "Moves text along a path specified in a \\clip. Currently only works on fbf lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.Nudge/",
        name: "Nudge",
        description: "Provides configurable and hotkeyable tag/line modification macros.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.PasteAiLines/",
        name: "Paste AI Lines",
        description: "Convenience macro for pasting full lines exported by AI2ASS.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.ShakeIt/",
        name: "Shake It",
        description: "Lets you add a shaking effect to fbf typesets with configurable constraints.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.SplitLines/",
        name: "Split Lines",
        description: "Splits lines at configurable intervals, specified indexes or at tag boundaries while maintaining appearance.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/l0.VerticalText/",
        name: "Vertical Text",
        description: "Splits a line into vertical text.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.BorderSplit/",
        name: "Duplicate and Blur",
        description: "Splits a bordered line into two layers, so both text and outline have blur.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.CircleText/",
        name: "Circular text",
        description: "Puts the text on a circular arc centered on the origin.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.ClipBlur/",
        name: "Blur clip",
        description: "Blurs a vector clip.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.ClipGrad/",
        name: "Gradient along clip edge",
        description: "Color gradient along clip edge. Solid alpha only.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.ClipShifter/",
        name: "Clip shifter",
        description: "Reads a rectangular clip from the first line and places it on the other highlighted ones.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.FbfTransform/",
        name: "Frame-by-frame transform",
        description: "Smoothly transforms between the first and last selected lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.GradientByChar/",
        name: "Gradient by character",
        description: "Smoothly transforms tags across your line, by character.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.GradientEverything/",
        name: "Gradient Everything",
        description: "This will gradient everything.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.Image2ASS/",
        name: "Image to .ass",
        description: "Converts bitmap image to .ass lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.KaraHelper/",
        name: "Karaoke helper",
        description: "Miscellaneous tools for assisting in karaoke timing.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.KaraReplacer/",
        name: "Karaoke replacer",
        description: "Replaces the syllables of a verse.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.LayerIncrement/",
        name: "Layer increment",
        description: "Makes increasing or decreasing layer numbers.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.LuaInterpret/",
        name: "Lua Interpreter",
        description: "Run Lua code on the fly.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.ModifyMocha/",
        name: "Mass modify mocha lines",
        description: "Allows you to quickly change the appearance of mocha tracked lines without reapplying motion data.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.MoveClip/",
        name: "Move with clip",
        description: "Moves both position and rectangular clip.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.SemiColorCalc/",
        name: "Semitransparent color calculator",
        description: "Input a target and background color to calculate the original color.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.TemplateManager/",
        name: "Template Manager",
        description: "Manage typsetting templates.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/lyger.VecClipGradient/",
        name: "Vector-Clip Gradient",
        description: "Intersects the rectangular clips on a gradient with a specified vector clip.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/myaa.MergeScripts/",
        name: "Merge Scripts",
        description: "Provides advanced script merging, mainly for use during QC.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/myaa.Bounce/",
        name: "Bounce",
        description: "Make text bouncy.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/myaa.PasteFromPad/",
        name: "Paste From Pad",
        description: "Paste text from pad over existing lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Cycles/",
        name: "Cycles",
        description: "Cycles blur, border, shadow, alpha, etc.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Cycles/",
        name: "Cycles",
        description: "Cycles blur, border, shadow, alpha, etc.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.iBus/",
        name: "iBus",
        description: "Italy Bold Under Strike",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.iBus/",
        name: "iBus",
        description: "Italy Bold Under Strike",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.LineBreaker/",
        name: "Line Breaker",
        description: "insert/shift linebreaks",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.LineBreaker/",
        name: "Line Breaker",
        description: "insert/shift linebreaks",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.JoinSplitSnap/",
        name: "Join / Split / Snap",
        description: "Joins lines / splits lines / snaps to keyframes",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.JoinSplitSnap/",
        name: "Join / Split / Snap",
        description: "Joins lines / splits lines / snaps to keyframes",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.JumpToNext/",
        name: "Jump to Next",
        description: "Jumps to next 'sign' in the subtitle grid",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.JumpToNext/",
        name: "Jump to Next",
        description: "Jumps to next 'sign' in the subtitle grid",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ScriptCleanup/",
        name: "Script Cleanup",
        description: "Removes selected stuff from script",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ScriptCleanup/",
        name: "Script Cleanup",
        description: "Removes selected stuff from script",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.BlurAndGlow/",
        name: "Blur and Glow",
        description: "Adds blur and/or glow to signs",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.BlurAndGlow/",
        name: "Blur and Glow",
        description: "Adds blur and/or glow to signs",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.HYDRA/",
        name: "HYDRA",
        description: "A multi-headed typesetting tool",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.HYDRA/",
        name: "HYDRA",
        description: "A multi-headed typesetting tool",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Relocator/",
        name: "Hyperdimensional Relocator",
        description: "Advanced metamorphosis of multidimensional coordinates",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Relocator/",
        name: "Hyperdimensional Relocator",
        description: "Advanced metamorphosis of multidimensional coordinates",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Recalculator/",
        name: "Recalculator",
        description: "recalculates things",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Recalculator/",
        name: "Recalculator",
        description: "recalculates things",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Colorize/",
        name: "Colourise",
        description: "Does things with colours",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Colorize/",
        name: "Colourise",
        description: "Does things with colours",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Selectrix/",
        name: "Selectricks",
        description: "Selectricks and Sortricks",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Selectrix/",
        name: "Selectricks",
        description: "Selectricks and Sortricks",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ChangeCase/",
        name: "Change Case",
        description: "Capitalises text or makes it lowercase / uppercase",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ChangeCase/",
        name: "Change Case",
        description: "Capitalises text or makes it lowercase / uppercase",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.MultiLineEditor/",
        name: "Multi-Line Editor",
        description: "Multi-Line Editor",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.MultiLineEditor/",
        name: "Multi-Line Editor",
        description: "Multi-Line Editor",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.MultiCopy/",
        name: "MultiCopy",
        description: "Copy and paste just about anything from/to multiple lines",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.MultiCopy/",
        name: "MultiCopy",
        description: "Copy and paste just about anything from/to multiple lines",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.FadeWorks/",
        name: "FadeWorkS",
        description: "Works with Fades",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.FadeWorks/",
        name: "FadeWorkS",
        description: "Works with Fades",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Significance/",
        name: "Significance",
        description: "Import stuff, number stuff, chapter stuff, replace stuff, do a significant amount of other stuff to stuff.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Significance/",
        name: "Significance",
        description: "Import stuff, number stuff, chapter stuff, replace stuff, do a significant amount of other stuff to stuff.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ShiftCut/",
        name: "ShiftCut",
        description: "Time Machine.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.ShiftCut/",
        name: "ShiftCut",
        description: "Time Machine.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.TimeSigns/",
        name: "Time Signs",
        description: "Rough-times signs from TS timecodes",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.TimeSigns/",
        name: "Time Signs",
        description: "Rough-times signs from TS timecodes",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Masquerade/",
        name: "Masquerades as a useful script",
        description: "Masquerade",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Masquerade/",
        name: "Masquerades as a useful script",
        description: "Masquerade",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.NecrosCopy/",
        name: "NecrosCopy",
        description: "Copy and Fax Things. Occasionally perform a necroscopy.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.NecrosCopy/",
        name: "NecrosCopy",
        description: "Copy and Fax Things. Occasionally perform a necroscopy.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.EncodeHardsub/",
        name: "Encode - Hardsub",
        description: "Encode a clip with or without hardsubs",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.EncodeHardsub/",
        name: "Encode - Hardsub",
        description: "Encode a clip with or without hardsubs",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Multiplexer/",
        name: "Multiplexer",
        description: "Muxes stuff using mkvmerge",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.Multiplexer/",
        name: "Multiplexer",
        description: "Muxes stuff using mkvmerge",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.QC/",
        name: "Quality Check",
        description: "Checks your shitty script and tells you how bad it is",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/ua.QC/",
        name: "Quality Check",
        description: "Checks your shitty script and tells you how bad it is",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.allCharsTo/",
        name: "All Characters To",
        description: "Converts all characters to uppercase, lowercase or capitalized.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.everythingShape/",
        name: "Everything Shape",
        description: "Do \"everything\" you need for a shape!",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.gradientCut/",
        name: "Gradient Cut",
        description: "Generates a gradient from cuts in sequence.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.line2fbf/",
        name: "Line To FBF",
        description: "Splits the line frame by frame interpolating all transformations present in it",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.makeImage/",
        name: "Make Image",
        description: "Converts images of various formats to pixels written in shape.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.split/",
        name: "Splits Text By",
        description: "Splits the text in several ways",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zf.textInClip/",
        name: "Text in Clip",
        description: "Causes the characters in your text to go through the coordinates of your clip!",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zah.pers-mo_BETA/",
        name: "Aegisub-Perspective-Motion BETA",
        description: "Applying perspective tracking",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/macros/zah.aegi-color-track/",
        name: "Aegisub-Color-Tracking",
        description: "Tracking the color from a given pixel or tracking data",
      }
    );
    
  

  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/petzku.easings/",
        name: "Easings",
        description: "A library of easy-to-use easing functions for transforms",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/petzku.util/",
        name: "petzkuLib",
        description: "Various utility functions for use with petzku's Aegisub macros",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/BM.BadMutex/",
        name: "BadMutex",
        description: "A bad, global mutex.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/BM.BadMutex/",
        name: "BadMutex",
        description: "A bad, global mutex.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/PT.PreciseTimer/",
        name: "PreciseTimer",
        description: "A precise timer.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/PT.PreciseTimer/",
        name: "PreciseTimer",
        description: "A precise timer.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/DM.DownloadManager/",
        name: "DownloadManager",
        description: "Nonblocking downloads with libcurl.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/DM.DownloadManager/",
        name: "DownloadManager",
        description: "Nonblocking downloads with libcurl.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/requireffi.requireffi/",
        name: "requireffi",
        description: "Load C libraries with ease.",
      }
    );
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/requireffi.requireffi/",
        name: "requireffi",
        description: "Load C libraries with ease.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.ConfigHandler/",
        name: "ConfigHandler",
        description: "A class for mapping dialogs to persistent configuration.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.DataHandler/",
        name: "DataHandler",
        description: "A class for parsing After Effects motion data.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.DataWrapper/",
        name: "DataWrapper",
        description: "A class for wrapping motion data.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Line/",
        name: "Line",
        description: "A class for containing and manipulating a line.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.LineCollection/",
        name: "LineCollection",
        description: "A class for handling collections of lines.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Log/",
        name: "Log",
        description: "A collection of methods for dumping text everywhere.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Math/",
        name: "Math",
        description: "Extra math functions.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.MotionHandler/",
        name: "MotionHandler",
        description: "A class for applying motion data to a LineCollection.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.ShakeShapeHandler/",
        name: "ShakeShapeHandler",
        description: "A class for parsing shake shape motion data.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Statistics/",
        name: "Statistics",
        description: "A class for STATS.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Tags/",
        name: "Tags",
        description: "A mess for manipulating tags.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.Transform/",
        name: "Transform",
        description: "A class for managing the transform tag.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/a-mo.TrimHandler/",
        name: "TrimHandler",
        description: "A class for encoding video clips.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/arch.Math/",
        name: "ArchMath",
        description: "General-purpose linear algebra functions, approximately matching the patterns of Matlab or numpy",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/arch.Perspective/",
        name: "Perspective",
        description: "Math functions for dealing with perspective transformations.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/l0.ASSFoundation/",
        name: "ASSFoundation",
        description: "General purpose ASS processing library.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/Flux.ScrollHandler/",
        name: "ScrollHandler",
        description: "Library to store and load scrollbar positions on Windows",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/l0.DependencyControl/",
        name: "DependencyControl",
        description: "Dependency manager and automatic script updater for Aegisub macros and modules.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/l0.Functional/",
        name: "(Almost) Functional Suite",
        description: "Collection of commonly used functions",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/lyger.LibLyger/",
        name: "LibLyger",
        description: "Library of commonly used functions across all of lyger's automation scripts.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/myaa.ASSParser/",
        name: "ASS Parser",
        description: "An ASS parser for Aegisub automations.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/myaa.pl/",
        name: "Penlight",
        description: "Python-inspired utility library.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/SubInspector.Inspector/",
        name: "SubInspector",
        description: "Provides low level inspection and analysis of subtitles post-rasterization.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/ZF.main/",
        name: "ZF main",
        description: "A library used in zeref's Aegisub scripts.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/zgiflib.giflib/",
        name: "giflib",
        description: "giflib is a library for reading and writing gif images.",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/zlodepng.lodepng/",
        name: "lodepng",
        description: "PNG encoder and decoder",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/zpolyclipping.polyclipping/",
        name: "polyclipping",
        description: "Polygon Clipping and Offsetting",
      }
    );
    
  
    
    index.add(
      {
        id: i++,
        href: "/depctrl-browser/modules/zturbojpeg.turbojpeg/",
        name: "turbojpeg",
        description: "jpeg library",
      }
    );
    
  

  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/7161932/",
      name: "petzku's Automation Scripts",
      description: "Main repository for all of petzku's automation scripts.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/8fe234d/",
      name: "PhosCity's Aegisub Scripts",
      description: "Main repository for all of PhosCity's automation macros.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/2d000a9/",
      name: "FFI Experiments",
      description: "Experiments combining C++ with luajit FFI",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/4152f8d/",
      name: "Aegisub-Motion",
      description: "A set of tools for simplifying the process of creating and applying motion tracking data with Aegisub.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/b409fc1/",
      name: "arch1t3cht's Aegisub Scripts",
      description: "Main repository for all of arch1t3cht's automation macros.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/92c766d/",
      name: "ASSFoundation",
      description: "ASSFoundation and ancillary modules.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/b6a37e0/",
      name: "CoffeeFlux's Aegisub Scripts",
      description: "striving to create scripts even dumber than torque's",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/7973b7b/",
      name: "DependencyControl",
      description: "The official DependencyControl repository.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/1fe3ac7/",
      name: "FFI Experiments",
      description: "Experiments combining C++ with luajit FFI",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/c5d5896/",
      name: "Functional",
      description: "The official Functional repository.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/7afe7c4/",
      name: "line0's Aegisub Scripts",
      description: "Main repository for all of line0's automation macros.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/41828c0/",
      name: "lyger's Automation Scripts",
      description: "Main repository for all of lyger's automation scripts.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/d5b4bc1/",
      name: "Myaamori's Aegisub scripts",
      description: "Main repository for Myaamori's automation macros.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/881e0ee/",
      name: "SubInspector",
      description: "Official SubInspector repository",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/720a751/",
      name: "unanimated's Automation Scripts",
      description: "Secondary repository for most of unanimated's automation scripts.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/fbbbec7/",
      name: "zeref-aegisub-scripts",
      description: "Aegisub scripts from zerefxx",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/827532f/",
      name: "unanimated's Automation Scripts",
      description: "Secondary repository for most of unanimated's automation scripts.",
    }
  );
  
  index.add(
    {
      id: i++,
      href: "/depctrl-browser/feeds/08cbca4/",
      name: "Zahuczky's Automation Scripts",
      description: "Main repository for all of Zahuczky's automation scripts.",
    }
  );
  

  search.addEventListener('input', show_results, true);

  function show_results(){
    const maxResult = 5;
    var searchQuery = this.value;
    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    // inform user that no results were found
    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div')
      noResultsMessage.innerHTML = `No results for "<strong>${searchQuery}</strong>"`
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.name;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = doc.description;
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }
  }
}());