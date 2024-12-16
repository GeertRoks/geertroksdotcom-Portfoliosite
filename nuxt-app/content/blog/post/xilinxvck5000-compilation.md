---
title: Compiling and linking applications for the AMD Versal VCK5000 datacenter card
description: "A tutorial on how to compile projects for the AMD Versal-based VCK5000 datacenter card using only command-line tools, including a Makefile"
image: versal-vck5000.png
date: 2024-03
status: publish
featured: true
tags:
  - AMD Versal
  - compilation
  - FPGA
  - High-Performance Computing
---

The AMD Versal platform allows developers to create high-performance computing systems using Programmable Logic, as well as GPU-like vector processors, called AI Engines. These systems can be developed using the GUI of the AMD Vitis Software, but it is also possible to compile and link your sources from the Linux Terminal. This gives developers more control and repeatability of their HPC development environment. This tutorial goes through the steps to compile each component and link them together, and focuses in particular on the development for the VCK5000 data center card that is controlled by a host program over a PCIe connection. At the end a Makefile is presented that integrates all steps.

This tutorial assumes that you have access to a machine where the correct version of [Vitis is installed](https://xilinx.github.io/Vitis-Tutorials/2021-1/build/html/docs/Getting_Started/Vitis/Part2.html) and you have access to the VCK5000 platform file. The Vitis software package provides the tools we need: `v++` and `aiecompiler`.

## Project Structure

Although not required, I like to use a pre-defined project structure to organize the source and build files. The root of the project contains four main folders: 1) `aie/`, 2) `hls/`, 3) `app/` and 4) `build/`. The `aie/` folder contains source files for the AI Engines, the `hls/` folder the source files for the Programmable Logic and the `app/` folder contains the source files for the host program. These folders can further be organized by defining `src/`, `include/`, `data/` and other folders that might fit your project structure. The `build/` folder is used to collect the build artefacts which I would recommend to subdivide by [build target](https://docs.amd.com/r/2022.2-English/ug1393-vitis-application-acceleration/Build-Targets) (`x86sim/`, `sw_emu/`, `hw_emu/` and `hw/`). *Remember to keep the `build/` folder out of your version control!*

```
my-workspace/
├─ aie/
│  ├─ data/
│  │  ├─ golden.txt
│  │  ├─ input_left.txt
│  │  ├─ input_right.txt
│  ├─ src/
│  │  ├─ <aie-graph>/
│  │  │  ├─ kernels/
│  │  │  ├─ graph.h
│  │  │  ├─ kernels.h
│  │  │  ├─ project.cpp
│  │  ├─ <another-aie-graph>/
├─ app/
│  ├─ src/
│  │  ├─ host.cpp
├─ hls/
│  ├─ src/
│  │  ├─ kernel1.cpp
│  │  ├─ kernel2.cpp
├─ Makefile
├─ build/
│  ├─ hw/
│  │  ├─ aie/
│  │  ├─ hls/
│  │  ├─ sys/
│  ├─ hw_emu/
│  ├─ sw_emu/
│  ├─ x86sim/
```

## AI Engines
AI Engine kernels run on the AI Engines of the VCK5000. The sources of an AI Engine kernel are contained in the `aie/src` folder. These kernels are organized in [kernel graphs](https://docs.amd.com/r/2022.2-English/ug1079-ai-engine-kernel-coding/Graph-Topologies). Since I wanted to test many graph topologies and kernel variations, I subdivided each version of a graph in a separate directory, each with a similar organization.

The `project.cpp` file is the root of the project that includes the `graph.h` file which extends the abstract graph class to create our graph. This top graph can contain kernels or even more graphs. So how you further organize it, is up to you, but I used a `kernel` directory that contained the sources of all AIE kernels and were defined by the `kernels.h` file.

To compile the AIE graph use the `aiecompiler`, which will create a `libadf.a` library file, as well as a `Work` directory (contains intermediate results and compilation reports). We'll use the `-I` flag to include files needed for the compilation. The `--target` flag sets the build target and `--platform` sets the platform file that you downloaded during the installation process of Vitis.

```
aiecompiler \
  --target <build target> \
  --platform <path/to/platform/file.xpfm> \
  -I "aie/data/" \
  -I "aie/src/aie-graph/" \
  aie/src/<aie-graph>/project.cpp
```

It is also possible to control the location and name of the compilation artifacts. For the `Work` directory you can add `--workdir=<path/to/Work/>` to control the location and name. The name and location of the `libadf.a` file is set using `--output-archive <path/to/libadf.a>`.

## Programmable Logic
The source of the Programmable Logic kernels are contained in the `hls/src/` directory. These are organized in one kernel per file and thus are a little easier to compile.

The `v++` command is used with the `-c` flag to compile the PL kernels into `.xo` files. The `--target`, `--platform` and `-I` flags are the same as for the AI Engine kernels. For the PL kernels, we need to set the name of the kernel using the `-k` flag. This name should be the same as the HLS function in the file you are compiling. This name is later used when linking the PL and AIE kernels.

```
v++ -c \
  --target <build target> \
  --platform <path/to/platform/file.xpfm> \
  -I "hls/src/" \
  -k <kernel_name> \
  hls/src/kernel1.cpp
```

The name and location of the `.xo` files can be set using `-o <path/to/kernel1.xo>`. During the compilation of PL kernels, there are also some intermediate files created, that are by default stored in a `_x/` directory. The location of this directory can be set using `--temp_dir <path/to/_x/temp>`. I like to also store the logs and reports in this directory in order to keep all HLS related files in one place. These can be set using `--log_dir <path/to/_x/logs>` and `--report_dir <path/to/_x/reports>`.

## Linking and packaging
In the linking step, the `libadf.a` library of the AIE graph is combined with the `.xo` files of the PL kernels to create a `.xsa` hardware definition file. In the packaging step, the `.xsa` file is packaged into a bitstream that can be loaded onto the VCK5000.

So, first we need to link the AIE and PL kernels. We again use the `v++` command, but this time adding the `-l` command to let it get the linker. Again use the `--target` and `--platform` flags as before. The connections between the PL and AIE kernels and other configuration options can be defined using the [configuration file](https://docs.amd.com/r/2022.2-English/ug1393-vitis-application-acceleration/Vitis-Compiler-Configuration-File) that is added to the link command using `--config <path/to/configuration/file>`.

```
v++ -l \
  --target <build target> \
  --platform <path/to/platform/file.xpfm> \
  --config <path/to/configuration/file.cfg> \
  build/<target>/aie/libadf.a build/<target>/hls/kernel1.xo
```

It is also possible to specify the connections between the kernels with the [`--connectivity` flags](https://docs.amd.com/r/2022.2-English/ug1393-vitis-application-acceleration/connectivity-Options). All configurations that can be done in the configuration file, can also be done using [command line flags](https://docs.amd.com/r/2022.2-English/ug1393-vitis-application-acceleration/v-Command), so you can choose whatever fits your style.

And like before, also the location and name of the link output can be set using the `-o` flag.

With the hardware definition file linked, it can be packaged for the VCK5000 card. The hardware information is put in a [container format called xclbin](https://xilinx.github.io/XRT/2022.2/html/formats.html), which then can be loaded onto the device. For the Versal SoCs, we create this `.xclbin` file by packaging the linked `.xsa` file with the `libadf.a`. I am not sure why we need to add the `libadf.a` directory again, but I assume that it has to do with defining interfaces for the host program.

Packaging is similar to linking, where we use the `v++` command with the `-p` flag. Again also defining the `--target` and `--platform` flags, and the optional `-o` flag for setting the location and name of the output.

```
v++ -p \
  --target <build target> \
  --platform <path/to/platform/file.xpfm> \
  build/<target>/sys/hardware.xsa build/<target>/aie/libadf.a
```

For both linking and packaging, the v++ command generates reports, logs and temporary files. By default these are also placed in the `_x` directory as mentioned in the [Programmable Logic section](#Programmable_Logic). So, I like to put them in the same directories as the HLS output using `--reportdir`, `--logdir` and `--tempdir`.

## Host program

Compiling the host program is similar to any other compilation of a C/C++ program. The main thing that you need to make sure is that you include the definitions of the XRT library at compile time and add the library containing the implementation of the XRT library at link time. Or make it a one-liner, when you don't need a lot of control over the linking process.

It is important to note that the `$XILINX_XRT` environment variable must be set, which is done by sourcing the script that is provided by AMD: `source /opt/xilinx/xrt/setup.sh` (this script may be at a different location for you).

```
g++ -Wall \
  -Iapp/src \
  -I$XILINX_XRT/include \
  -L$XILINX_XRT/lib \
  -o build/<target>/host.exe \
  app/src/host.cpp 
  -lxrt_coreutil -luuid -pthread
```

The host program uses the [Device API](https://xilinx.github.io/XRT/2022.2/html/xrt_native.main.html#device-apis) of the XRT library to establish a connection with the Versal card and load the `.xclbin` file onto the card using the `load_xclbin` method.

## Makefile
These are a lot of steps to do each time and therefore a build system like a Makefile is a useful tool to make the process easy and repeatable.

This example is quite large and has some complex parts, but it shows that this approach allows to create complex build systems that exactly fit to your needs. Especially the connectivity part is very dynamic in this way. If you go the route of defining the PL AIE connections using the config file, then you need to make a config file for every number of connections.


```
# Versal card device bdf
# you can find it using lspci or xbutil examine
DEVICE ?= 0000:5e:00.1

# Targets: sw_emu, hw_emu, hw
TARGET := sw_emu

# name of a specific AIE graph directory in the aie/src/ directory
AIE := aie-graph

# platform file
PLATFORM := /opt/xilinx/platforms/xilinx_vck5000_gen4x8_qdma_2_202220_1/xilinx_vck5000_gen4x8_qdma_2_202220_1.xpfm

# The libadf.a library needs to be build with x86sim target for sw_emu and functional simulation,
# but with the hw build target for hw_emu, hw and hardware simulation
ifeq ($(TARGET),sw_emu)
    AIE_TARGET := x86sim
else
    AIE_TARGET := hw
endif

# Project source directories
DIR_HOST := app
DIR_AIE := aie
DIR_HLS := hls
DIR_BUILD := build

# build artefacts
AIE_LIBADF := $(DIR_BUILD)/$(AIE_TARGET)/aie/libadf_$(AIE).a
HLS_XO := $(DIR_BUILD)/$(TARGET)/hls/kernel1.xo $(DIR_BUILD)/$(TARGET)/hls/kernel2.xo $(DIR_BUILD)/$(TARGET)/hls/kernel3.xo
XSA := $(DIR_BUILD)/$(TARGET)/sys/$(WORKSPACE)_$(PL)_$(AIE).xsa
XCLBIN := $(DIR_BUILD)/$(TARGET)/$(WORKSPACE)_$(PL)_$(AIE).xclbin

# lists of build dependencies for linking and packaging
VPP_LINK_DEPS := $(AIE_LIBADF) $(HLS_XO)
VPP_PACKAGE_DEPS := $(XSA) $(AIE_LIBADF)

# v++ flags
VPP_HLS_FLAGS := --hls.jobs 8
VPP_VIVADO_FLAGS := --vivado.impl.jobs 8 --vivado.synth.jobs 8
VPP_PACKAGE_FLAGS := --package.boot_mode ospi --package.out_dir $(DIR_BUILD)/$(TARGET)/package
VPP_INTERMEDIATE_FILE_DIRS := --save-temps --temp_dir $(DIR_BUILD)/$(TARGET)/_x_$(PL)_$(AIE)/temp --report_dir $(DIR_BUILD)/$(TARGET)/_x_$(PL)_$(AIE)/reports --log_dir $(DIR_BUILD)/$(TARGET)/_x_$(PL)_$(AIE)/logs

# connectivity definition using bash scripting
# it allows parameter input to easily and dynamically scale the number of connections
# my current example is a little extreme, but it shows the power of this approach.
# the names that are use after the dot are names defined in the hls or ai_engine code.
define VPP_CONNECTION_FLAGS
--connectivity.nk kernel1:$(1):$(shell for i in $$(seq 0 $$(($(1)-1))); do echo -n "kernel1_$$i,"; done | sed 's/,$$//') \
--connectivity.nk kernel2:$(1):$(shell for i in $$(seq 0 $$(($(1)-1))); do echo -n "kernel2_$$i,"; done | sed 's/,$$//') \
--connectivity.nk kernel3:$(1):$(shell for i in $$(seq 0 $$(($(1)-1))); do echo -n "kernel3_$$i,"; done | sed 's/,$$//') \
$(shell for i in $$(seq 0 $$(($(1)-1))); do for j in 0 1 2 3; do echo -n " --connectivity.sc kernel1_$$i.s$$j:ai_engine_0.plio_in_$${i}_0_$${j}"; done; done) \
$(shell for i in $$(seq 0 $$(($(1)-1))); do for j in 0 1 2 3; do echo -n " --connectivity.sc kernel2_$$i.s$$j:ai_engine_0.plio_in_$${i}_1_$${j}"; done; done) \
$(shell for i in $$(seq 0 $$(($(1)-1))); do for j in 0 1 2 3; do echo -n " --connectivity.sc ai_engine_0.plio_out_$${i}_$${j}:kernel3_$$i.s$$j"; done; done) \
endef

NUM_AIE_IO := 2
VPP_CONNECTION_FLAGS := $(call VPP_CONNECTION_FLAGS,$(NUM_AIE_IO))


# gcc flags
GCC_HOST_FLAGS := -g -Wall -std=c++17
GCC_HOST_INCLUDES := -I$(DIR_HOST)/src -I${XILINX_XRT}/include -L${XILINX_XRT}/lib
GCC_HOST_LIBS := -lxrt_coreutil -luuid -pthread

# guard checks
# useful to check conditions before running a recipe
# for example checking whether the XILINX_XRT enviornment variable is set or if the build directory already exists
xrt_guard = @if [ -z "${XILINX_XRT}" ]; then \
		echo "ERROR: XRT is not defined. First run: 'source /opt/xilinx/xrt/setup.sh' or for UT servers 'module load xilinx/xrt' and then run this make recipe again."; \
		exit 1; \
	fi
dir_guard = @mkdir -p $(@D)
log_output := 2>&1 | tee screen_output.txt

#####################################################################################################
# Main Recipes
#####################################################################################################

all: xclbin host

host: $(DIR_BUILD)/$(TARGET)/host.exe

xclbin: $(XCLBIN)

xsa: $(XSA)

aie: $(AIE_LIBADF)

hls: $(HLS_XO)

run: run_$(TARGET)

#####################################################################################################
# Run recipes
#####################################################################################################

PROJECT_ROOT := $(shell pwd)
DIR_EMU_LOGS := emulation

# Execute program on hardware
run_hw:
	$(DIR_BUILD)/hw/host_$(INPUT_SRC).exe $(XCLBIN) $(DEVICE)

# Execute program using hardware emulation
run_hw_emu: $(DIR_BUILD)/hw_emu/emconfig.json
	@echo "Project root $(PROJECT_ROOT)"
	@mkdir -p $(DIR_EMU_LOGS)/hw_emu
	export XCL_EMULATION_MODE=hw_emu; \
	export XRT_INI_PATH=$(shell pwd)/xrt.ini; \
	cd $(DIR_EMU_LOGS)/hw_emu; \
	$(PROJECT_ROOT)/$(DIR_BUILD)/hw_emu/host.exe $(PROJECT_ROOT)/$(XCLBIN) $(DEVICE); \
	cd -

# Execute program using software emulation
run_sw_emu: $(DIR_BUILD)/sw_emu/emconfig.json
	@echo "Project root $(PROJECT_ROOT)"
	@mkdir -p $(DIR_EMU_LOGS)/sw_emu
	export XCL_EMULATION_MODE=sw_emu; \
	export XRT_INI_PATH=$(shell pwd)/xrt.ini; \
	cd $(DIR_EMU_LOGS)/sw_emu; \
	$(PROJECT_ROOT)/$(DIR_BUILD)/sw_emu/host_$(INPUT_SRC).exe $(PROJECT_ROOT)/$(XCLBIN) $(DEVICE); \
	cd -

#####################################################################################################
# Simulation recipes
#####################################################################################################

# Simulate the AI engines with hardware timings (uses data files in the aie/data directory as input)
aie_sim: $(DIR_BUILD)/hw/aie/libadf_$(AIE).a
	rm -r $(DIR_BUILD)/aiesimulator_output
	aiesimulator --pkg-dir=$(<D)/Work_$(AIE) --input-dir=$(DIR_AIE) --output-dir=$(DIR_BUILD)/aiesimulator_output --profile --dump-vcd=foo --output-time-stamp=no

# Simulate the AI engines only functionaly (uses data files in the aie/data directory as input)
aie_x86sim: $(DIR_BUILD)/x86sim/aie/libadf_$(AIE).a
	x86simulator --pkg-dir=$(<D)/Work_$(AIE) --input-dir=$(DIR_AIE) --output-dir=$(DIR_BUILD)/x86simulator_output

#####################################################################################################
# Build recipes
#####################################################################################################

# build target for host program
$(DIR_BUILD)/$(TARGET)/host.exe: $(DIR_HOST)/src/host.cpp
	$(xrt_guard)
	$(dir_guard)
	$(CXX) $(GCC_HOST_FLAGS) $(GCC_HOST_INCLUDES) -o $@ $^ $(GCC_HOST_LIBS)

# build target for xclbin (packaging step)
$(XCLBIN): $(VPP_PACKAGE_DEPS)
	$(dir_guard)
	v++ -p --target $(TARGET) --platform $(PLATFORM) $(VPP_PACKAGE_FLAGS) $(VPP_INTERMEDIATE_FILE_DIRS) $^ -o $@

# build target for xsa (linking step)
$(XSA): $(VPP_LINK_DEPS)
	$(dir_guard)
	v++ -l -t $(TARGET) -g --platform $(PLATFORM) $(VPP_LINK_CLOCK_FLAGS) $(VPP_PROFILE_FLAGS) $(VPP_VIVADO_FLAGS) $(VPP_CONNECTION_FLAGS) $(VPP_INTERMEDIATE_FILE_DIRS) $^ -o $(XSA)

# build target for xo (PL compilation step)
$(DIR_BUILD)/hw/hls/%.xo: $(DIR_HLS)/src/%.cpp $(DIR_HLS)/src/transpose.cpp
	$(dir_guard)
	v++ -c --target hw --platform $(PLATFORM) $(VPP_HLS_FLAGS) $(VPP_INTERMEDIATE_FILE_DIRS) -k $(firstword $(subst _, ,$*)) $^ -I$(DIR_HLS)/src -o $@

# build target for libadf (AIE compilation step)
$(DIR_BUILD)/%/aie/libadf_$(AIE).a: $(AIE_SRCS_MAIN)
	$(dir_guard)
	aiecompiler --target $* --platform $(PLATFORM) -I "${XILINX_VITIS}/aietools/include" -I "$(DIR_AIE)/src/$(AIE)" -I "$(DIR_AIE)/data" -I "$(DIR_AIE)/src/$(AIE)/kernels" -I "$(DIR_AIE)" --workdir=$(@D)/Work_$(AIE) $< --output-archive $@

#####################################################################################################
# emu config (needed for emulation)

%emconfig.json:
	emconfigutil --platform $(PLATFORM) --nd 1 --od $(@D)

#####################################################################################################
# clean

clean_x86sim:
	rm -r $(DIR_BUILD)/x86sim/
clean_sw_emu:
	rm -r $(DIR_BUILD)/sw_emu/
clean_hw_emu:
	rm -r $(DIR_BUILD)/hw_emu/
clean_hw:
	rm -r $(DIR_BUILD)/hw/

clean_build:
	rm -r $(DIR_BUILD)

clean:
	rm -f AIECompiler.log AIESimulator.log
	rm -f vitis_analyzer*.{log,jou}
	rm -f v++_$(WORKSPACE).log
	rm -f xcd.log
	rm -f device_trace_0.csv diag_report.log Map_Report.csv native_trace.csv sol.db summary.csv user_events.csv
	rm -f system_flat.wcfg system.wcfg system.wdb tmp.vcd.vcd vcdanalyze.log
	rm -f xrt.run_summary xsc_report.log
	rm -rf trdata.aiesim/

```

This is a basic framework to compile and build your Versal projects and should be adapted to your needs. If you are not familiar with Makefile variables (like `$*`, `$@`, `$<`, `$^`, etc.), then take a look at [this Makefile reference page](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html).


See also my project where I accelerated a specific genetics function using the Versal SoC. The project structure and Makefile may provide inspiration or a good starting point for your project.

:Github{href="https://github.com/GeertRoks/AMD-Versal-phylogenetic-likelihood-function"}
